import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { campaignService, analyticsService } from '../services/api';
import { useToast } from '../context/ToastContext';
import { ChartSkeleton, Skeleton } from '../components/Skeleton';

interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalBudget: number;
  totalSpend: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalBudget: 0,
    totalSpend: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  const chartData = [
    { name: 'Mon', impressions: 4000, clicks: 240 },
    { name: 'Tue', impressions: 3000, clicks: 221 },
    { name: 'Wed', impressions: 2000, clicks: 229 },
    { name: 'Thu', impressions: 2780, clicks: 200 },
    { name: 'Fri', impressions: 1890, clicks: 229 },
    { name: 'Sat', impressions: 2390, clicks: 200 },
    { name: 'Sun', impressions: 3490, clicks: 210 },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await campaignService.list(1, 100);
      const campaigns = response.data.campaigns;

      const activeCampaigns = campaigns.filter((c: any) => c.status === 'ACTIVE').length;
      const totalBudget = campaigns.reduce((sum: number, c: any) => sum + (c.budget || 0), 0);

      setStats({
        totalCampaigns: campaigns.length,
        activeCampaigns,
        totalBudget,
        totalSpend: 0, // Would calculate from analytics
      });
    } catch (error) {
      addToast('Failed to load dashboard', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-2">Total Campaigns</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCampaigns}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-2">Active Campaigns</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeCampaigns}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-2">Total Budget</p>
              <p className="text-3xl font-bold text-gray-900">${stats.totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-2">Total Spend</p>
              <p className="text-3xl font-bold text-gray-900">${stats.totalSpend.toLocaleString()}</p>
            </div>
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Weekly Performance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="impressions" stroke="#0ea5e9" strokeWidth={2} />
                  <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Daily Conversions</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="clicks" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
