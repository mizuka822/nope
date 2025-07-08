import React from 'react';
import { Zap, Eye, Star, Waves } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Star },
    { id: 'dreamlicense', label: 'DreamLicense', icon: Eye },
    { id: 'ai-companion', label: 'AI Companion', icon: Zap },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'xr-immersion', label: 'XR Experience', icon: Waves },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center animate-pulse">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Melodyn
            </h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`px-5 py-2 rounded-full text-base font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30 text-purple-700 shadow-lg shadow-purple-500/20'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-pink-500/10 hover:to-orange-500/10 hover:text-purple-600'
                  }`}
                >
                  <Icon className="w-5 h-5 inline mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;