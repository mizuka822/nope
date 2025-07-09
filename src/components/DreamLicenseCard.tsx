import React from 'react';
import { Star, Users, Zap, Heart, Sparkles, Crown } from 'lucide-react';

interface DreamLicenseData {
  id: string;
  name: string;
  image: string;
  personality: string;
  interactions: number;
  rating: number;
  price: string;
}

interface DreamLicenseCardProps {
  dreamLicense: DreamLicenseData;
}

const DreamLicenseCard: React.FC<DreamLicenseCardProps> = ({ dreamLicense }) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Premium badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400/90 to-orange-500/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-white shadow-lg">
          <Crown className="w-3 h-3" />
          <span>PREMIUM</span>
        </div>
      </div>

      {/* Rating badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-white">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{dreamLicense.rating}</span>
        </div>
      </div>
      
      {/* Image container with enhanced effects */}
      <div className="relative mb-6 overflow-hidden rounded-xl">
        <div className="aspect-[4/5] relative">
          <img 
            src={dreamLicense.image} 
            alt={dreamLicense.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          
          {/* Sparkle effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Floating heart on hover */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="relative z-10">
        {/* Name with enhanced typography */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-700 transition-colors duration-300 flex items-center space-x-2">
          <span>{dreamLicense.name}</span>
          <Sparkles className="w-4 h-4 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </h3>
        
        {/* Personality with better styling */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {dreamLicense.personality}
        </p>
        
        {/* Stats section with enhanced design */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-1 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-400/20 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">{dreamLicense.interactions.toLocaleString()}</span>
              <span className="text-xs">interactions</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-sm">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500/20 to-pink-400/20 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-pink-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-pink-600">{dreamLicense.price}</span>
              <span className="text-xs text-gray-500">price</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced button */}
        <button className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 hover:from-pink-500/30 hover:to-purple-500/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-pink-500/20 group/button">
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 transform scale-x-0 group-hover/button:scale-x-100 transition-transform duration-300 origin-left" />
          
          <span className="relative flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 group-hover/button:text-pink-600 transition-colors duration-300" />
            <span className="group-hover/button:text-pink-700 transition-colors duration-300">Connect Dream</span>
            <Sparkles className="w-4 h-4 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
          </span>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700" />
        </button>
        
        {/* Interaction indicator */}
        <div className="mt-3 flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Available now</span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default DreamLicenseCard;