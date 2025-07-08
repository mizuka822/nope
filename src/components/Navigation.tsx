import React from 'react';
import { Heart, Sparkles, Shield, Headphones } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dreamlicense', label: 'DreamLicense', icon: Sparkles },
    { id: 'ai-companion', label: 'AI Companion', icon: Heart },
    { id: 'privacy', label: 'ZK Privacy', icon: Shield },
    { id: 'xr-immersion', label: 'XR Experience', icon: Headphones },
  ];

  return (
    <nav className="fixed top-0 left-20 right-0 z-40 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400/30 to-gray-400/30 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-gray-600 bg-clip-text text-transparent cursor-pointer"
              style={{ fontFamily: 'Sarpanch, monospace' }}
              onClick={() => onPageChange('home')}
            >
              Melodyn
            </h1>
          </div>
          
          {/* Navigation Items */}
          <div className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-pink-500/20 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-pink-400/30 to-gray-400/30 text-pink-700 border-pink-300/50'
                      : 'bg-white/10 text-gray-700 hover:bg-gradient-to-r hover:from-pink-300/20 hover:to-gray-300/20 hover:text-pink-600'
                  }`}
                  style={{
                    borderRadius: '50px',
                    background: currentPage === item.id 
                      ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(156, 163, 175, 0.3))'
                      : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Icon className="w-4 h-4 inline mr-2" />
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