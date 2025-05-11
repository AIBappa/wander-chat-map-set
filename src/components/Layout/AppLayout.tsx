
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Map, MessageSquare, Settings } from 'lucide-react';

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [
    { id: 'map', label: 'Map', icon: Map, path: '/app/map' },
    { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/app/chat' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/app/settings' }
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleTabChange = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main content */}
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      
      {/* Bottom navigation */}
      <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive(tab.path) 
                  ? 'text-appPurple' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <tab.icon className={`h-6 w-6 ${
                isActive(tab.path) ? 'animate-slide-up' : ''
              }`} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
