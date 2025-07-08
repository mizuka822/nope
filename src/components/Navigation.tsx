import React from 'react';
import { Heart, Shield, Sparkles, Headphones } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'dreamlicense', label: 'DreamLicense', icon: Sparkles },
    { id: 'ai-companion', label: 'AI Companion', icon: Heart },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'xr-immersion', label: 'XR Experience', icon: Headphones },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-200 to-gray-300 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-gray-600 bg-clip-text text-transparent">
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-white/20 text-pink-600 shadow-lg'
                      : 'text-gray-600 hover:bg-white/10 hover:text-pink-500'
                  }`}
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