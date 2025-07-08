import React, { useState } from 'react';
import { CreditCard, HelpCircle, Settings, User, Search, Wallet, Globe, UserCog, Lock } from 'lucide-react';

interface SidebarProps {
  isLoggedIn: boolean;
  username: string;
  onLoginClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isLoggedIn, username, onLoginClick }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white/10 backdrop-blur-md border-r border-white/20 z-50 flex flex-col">
      {/* Recharge */}
      <div className="p-4 border-b border-white/20">
        <button 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400/30 to-green-500/30 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.3))',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          <CreditCard className="w-6 h-6 text-green-600" />
        </button>
      </div>

      {/* Question Mode */}
      <div className="p-4 border-b border-white/20">
        <button 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/30 to-blue-500/30 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.3))',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          <HelpCircle className="w-6 h-6 text-blue-600" />
        </button>
      </div>

      {/* Settings */}
      <div className="p-4 border-b border-white/20 relative">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400/30 to-purple-500/30 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(126, 34, 206, 0.3))',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          <Settings className="w-6 h-6 text-purple-600" />
        </button>

        {/* Settings Dropdown */}
        {showSettings && (
          <div className="absolute left-20 top-0 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4 z-60">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <UserCog className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Account Settings</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Password Settings</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Language Settings</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Personalize Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* User Login */}
      <div className="p-4">
        <button 
          onClick={onLoginClick}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400/30 to-gray-500/30 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg hover:shadow-gray-500/20 transition-all duration-300 hover:scale-105"
          style={{
            background: isLoggedIn 
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.3))'
              : 'linear-gradient(135deg, rgba(156, 163, 175, 0.3), rgba(107, 114, 128, 0.3))',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          <User className={`w-6 h-6 ${isLoggedIn ? 'text-green-600' : 'text-gray-600'}`} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;