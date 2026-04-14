import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Welcome back!</h2>
        <div className="flex items-center gap-6">
          <button className="relative text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              <User className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
