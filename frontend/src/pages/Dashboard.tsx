import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface DashboardData {
  totalCampaigns: number;
  activeAds: number;
  totalSpend: number;
  totalRevenue: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    totalCampaigns: 0,
    activeAds: 0,
    totalSpend: 0,
    totalRevenue: 0,
  });

  const chartData = [
    { name: 'Mon', impressions: 4000, clicks: 240 },
    { name: 'Tue', impressions: 3000, clicks: 221 },
    { name: 'Wed', impressions: 2000, clicks: 229 },
    { name: 'Thu', impressions: 2780, clicks: 200 },
    { name: 'Fri', impressions: 1890, clicks: 229 },
    { name: 'Sat', impressions: 2390, clicks: 200 },
    { name: 'Sun', impressions: 3490, clicks: 21 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-2">Total Campaigns</p>
          <p className="text-3xl font-bold text-gray-900">{data.totalCampaigns}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-2">Active Ads</p>
          <p className="text-3xl font-bold text-gray-900">{data.activeAds}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-2">Total Spend</p>
          <p className="text-3xl font-bold text-gray-900">${data.totalSpend}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">${data.totalRevenue}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Weekly Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="impressions" stroke="#0ea5e9" />
              <Line type="monotone" dataKey="clicks" stroke="#10b981" />
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
      </div>
    </div>
  );
};

export default Dashboard;
