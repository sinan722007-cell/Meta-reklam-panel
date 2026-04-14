import { Router, Request, Response } from 'express';
import { authMiddleware, asyncHandler, AuthenticatedRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { pool } from '../config/database';
import logger from '../config/logger';

const router = Router();

/**
 * GET /api/analytics
 * Get campaign analytics
 */
router.get(
  '/',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError(401, 'Not authenticated');
    }

    const { campaign_id, start_date, end_date } = req.query;

    if (!campaign_id) {
      throw new AppError(400, 'campaign_id is required');
    }

    // Verify campaign belongs to user
    const campaign = await pool.query(
      'SELECT id FROM campaigns WHERE id = $1 AND user_id = $2',
      [campaign_id, req.user.id]
    );

    if (campaign.rows.length === 0) {
      throw new AppError(404, 'Campaign not found');
    }

    let query = 'SELECT * FROM analytics WHERE campaign_id = $1';
    const params: any[] = [campaign_id];

    if (start_date) {
      query += ' AND date >= $' + (params.length + 1);
      params.push(start_date);
    }

    if (end_date) {
      query += ' AND date <= $' + (params.length + 1);
      params.push(end_date);
    }

    query += ' ORDER BY date ASC';

    const result = await pool.query(query, params);

    // Calculate summary
    const summary = {
      total_impressions: 0,
      total_clicks: 0,
      total_conversions: 0,
      total_spend: 0,
      total_revenue: 0,
      avg_ctr: 0,
      avg_cpc: 0,
      avg_roas: 0,
    };

    result.rows.forEach((row) => {
      summary.total_impressions += row.impressions || 0;
      summary.total_clicks += row.clicks || 0;
      summary.total_conversions += row.conversions || 0;
      summary.total_spend += Number(row.spend) || 0;
      summary.total_revenue += Number(row.revenue) || 0;
    });

    if (result.rows.length > 0) {
      summary.avg_ctr = summary.total_impressions > 0
        ? (summary.total_clicks / summary.total_impressions * 100)
        : 0;
      summary.avg_cpc = summary.total_clicks > 0
        ? (summary.total_spend / summary.total_clicks)
        : 0;
      summary.avg_roas = summary.total_spend > 0
        ? (summary.total_revenue / summary.total_spend)
        : 0;
    }

    res.json({
      data: result.rows,
      summary: {
        ...summary,
        total_spend: Number(summary.total_spend.toFixed(2)),
        total_revenue: Number(summary.total_revenue.toFixed(2)),
        avg_ctr: Number(summary.avg_ctr.toFixed(2)),
        avg_cpc: Number(summary.avg_cpc.toFixed(2)),
        avg_roas: Number(summary.avg_roas.toFixed(2)),
      },
    });
  })
);

export default router;
