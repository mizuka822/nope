import React from 'react';
import DreamLicenseCard from '../components/DreamLicenseCard';
import FeatureCard from '../components/FeatureCard';
import { Sparkles, Heart, Shield, Headphones } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const dreamLicenses = [
    {
      id: '1',
      name: 'Aurora',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      personality: 'Gentle, empathetic, loves poetry and stargazing',
      interactions: 1247,
      rating: 4.9,
      price: '2.5 ETH'
    },
    {
      id: '2',
      name: 'Zara',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      personality: 'Adventurous, playful, tech-savvy dreamer',
      interactions: 892,
      rating: 4.8,
      price: '1.8 ETH'
    },
    {
      id: '3',
      name: 'Luna',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      personality: 'Mysterious, artistic, loves deep conversations',
      interactions: 634,
      rating: 4.7,
      price: '3.2 ETH'
    },
    {
      id: '4',
      name: 'Nova',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      personality: 'Energetic, optimistic, fitness enthusiast',
      interactions: 945,
      rating: 4.8,
      price: '2.1 ETH'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'DreamLicense NFT',
      description: 'Mint exclusive NFT licenses with ZK authorization for your dream figures. Each license contains unique personality, voice, and interaction data.',
      page: 'dreamlicense'
    },
    {
      icon: Heart,
      title: 'AI Companion Generation',
      description: 'Create your personalized AI companion with advanced personality modeling, memory accumulation, and deep emotional interactions.',
      page: 'ai-companion'
    },
    {
      icon: Shield,
      title: 'Zero-Knowledge Privacy',
      description: 'All interactions are protected with zero-knowledge proofs. Your AI companion is non-transferable and completely private.',
      page: 'privacy'
    },
    {
      icon: Headphones,
      title: 'XR Immersive Experience',
      description: 'Experience true sensory realism with haptic suits, motion gloves, thermal feedback, and immersive XR environments.',
      page: 'xr-immersion'
    }
  ];

  return (
    <div className="pt-20 pb-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-gray-600 bg-clip-text text-transparent mb-4">
            Welcome to Melodyn
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The future of intimate connection through Web3 technology, AI companions, and immersive experiences
          </p>
        </div>
      </div>

      {/* New DreamLicense NFTs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">New DreamLicense NFTs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover exclusive virtual companions ready to create personalized dream experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dreamLicenses.map((dreamLicense) => (
            <DreamLicenseCard key={dreamLicense.id} dreamLicense={dreamLicense} />
          ))}
        </div>
      </div>

      {/* Core Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Core Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the advanced technologies that power your dream companion experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              onClick={() => onPageChange(feature.page)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;