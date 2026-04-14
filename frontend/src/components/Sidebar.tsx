import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Settings, TrendingUp, Zap } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Meta Panel
        </h1>
      </div>
      <nav className="space-y-4">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <BarChart3 className="w-5 h-5" />
          Dashboard
        </Link>
        <Link
          to="/campaigns"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Zap className="w-5 h-5" />
          Campaigns
        </Link>
        <Link
          to="/analytics"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <TrendingUp className="w-5 h-5" />
          Analytics
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
