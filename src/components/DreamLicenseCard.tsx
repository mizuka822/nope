import React from 'react';
import { Star, Users, Zap } from 'lucide-react';

interface DreamLicenseData {
  id: string;
  name: string;
  image: string;
  personality: string;
  interactions: number;
  rating: number;
  price: string;
  tags?: string[];
}

interface DreamLicenseCardProps {
  dreamLicense: DreamLicenseData;
  onSelect?: () => void;
}

const DreamLicenseCard: React.FC<DreamLicenseCardProps> = ({ dreamLicense, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
      style={{
        backdropFilter: 'blur(15px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
      }}
    >
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img 
          src={dreamLicense.image} 
          alt={dreamLicense.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-yellow-500/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 text-white" />
          <span className="text-xs text-white font-medium">{dreamLicense.rating}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{dreamLicense.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{dreamLicense.personality}</p>
      
      {dreamLicense.tags && (
        <div className="flex flex-wrap gap-1 mb-4">
          {dreamLicense.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-pink-500/20 text-pink-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{dreamLicense.interactions} interactions</span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-pink-600">
          <Zap className="w-4 h-4" />
          <span className="font-medium">{dreamLicense.price}</span>
        </div>
      </div>
      
      <button 
        className="w-full py-3 px-4 text-sm font-medium text-gray-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/20"
        style={{
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(156, 163, 175, 0.2))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(156, 163, 175, 0.3))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(156, 163, 175, 0.2))';
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default DreamLicenseCard;