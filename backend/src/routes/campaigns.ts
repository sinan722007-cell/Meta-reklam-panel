import { Router, Request, Response } from 'express';
import { authMiddleware, asyncHandler, AuthenticatedRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { pool } from '../config/database';
import { validateCampaignCreation } from '../utils/validators';
import logger from '../config/logger';
import { io } from '../index';

const router = Router();

/**
 * GET /api/campaigns
 * List campaigns for authenticated user
 */
router.get(
  '/',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError(401, 'Not authenticated');
    }

    const { page = 1, limit = 10, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = 'SELECT * FROM campaigns WHERE user_id = $1';
    const params: any[] = [req.user.id];

    if (status) {
      query += ' AND status = $2';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM campaigns WHERE user_id = $1';
    const countParams: any[] = [req.user.id];

    if (status) {
      countQuery += ' AND status = $2';
      countParams.push(status);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count, 10);

    res.json({
      campaigns: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  })
);

/**
 * GET /api/campaigns/:id
 * Get campaign details
 */
router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError(401, 'Not authenticated');
    }

    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM campaigns WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      throw new AppError(404, 'Campaign not found');
    }

    res.json({ campaign: result.rows[0] });
  })
);

/**
 * POST /api/campaigns
 * Create new campaign
 */
router.post(
  '/',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError(401, 'Not authenticated');
    }

    const errors = validateCampaignCreation(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { name, description, budget, start_date, end_date } = req.body;

    const result = await pool.query(
      `INSERT INTO campaigns (user_id, name, description, budget, start_date, end_date, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'DRAFT')
       RETURNING *`,
      [req.user.id, name, description, budget, start_date, end_date]
    );

    logger.info(`Campaign created: ${result.rows[0].id} by user ${req.user.email}`);

    // Emit real-time event
    io.to(`user_${req.user.id}`).emit('campaign_created', result.rows[0]);

    res.status(201).json({
      message: 'Campaign created successfully',
      campaign: result.rows[0],
    });
  })
);

/**
 * PUT /api/campaigns/:id
 * Update campaign
 */
router.put(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError(401, 'Not authenticated');
    }

    const { id } = req.params;
    const { name, description, budget, status, start_date, end_date } = req.body;

    // Check if campaign exists
    const existing = await pool.query(
      'SELECT * FROM campaigns WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (existing.rows.length === 0) {
      throw new AppError(404, 'Campaign not found');
    }

    const result = await pool.query(
      `UPDATE campaigns 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           budget = COALESCE($3, budget),
           status = COALESCE($4, status),
           start_date = COALESCE($5, start_date),
           end_date = COALESCE($6, end_date),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, description, budget, status, start_date, end_date, id]
    );

    logger.info(`Campaign updated: ${id} by user ${req.user.email}`);

    // Emit real-time event
    io.to(`user_${req.user.id}`).emit('campaign_updated', result.rows[0]);

    res.json({
      message: 'Campaign updated successfully',
      campaign: result.rows[0],
    });
  })
);

/**
 * DELETE /api/campaigns/:id
 * Delete campaign
 */
router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError(401, 'Not authenticated');
    }

    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM campaigns WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      throw new AppError(404, 'Campaign not found');
    }

    logger.info(`Campaign deleted: ${id} by user ${req.user.email}`);

    // Emit real-time event
    io.to(`user_${req.user.id}`).emit('campaign_deleted', { id });

    res.json({ message: 'Campaign deleted successfully' });
  })
);

export default router;
