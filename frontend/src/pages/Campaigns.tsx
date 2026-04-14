import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: string;
  budget: number;
  spend: number;
  impressions: number;
}

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Sale Campaign',
      status: 'Active',
      budget: 5000,
      spend: 2300,
      impressions: 45000,
    },
    {
      id: '2',
      name: 'Black Friday Promo',
      status: 'Scheduled',
      budget: 10000,
      spend: 0,
      impressions: 0,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Budget</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Spend</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Impressions</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{campaign.name}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">${campaign.budget}</td>
                <td className="px-6 py-4 text-sm text-gray-900">${campaign.spend}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{campaign.impressions}</td>
                <td className="px-6 py-4 text-sm flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaigns;
