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

      {/* Philosophy Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-8">
        <div className="text-center space-y-8 text-gray-400/80">
          <div>
            <h2 className="text-2xl font-light text-gray-500/90 mb-6">
              Melodyn: An Intimacy Revolution for the Future
            </h2>
            
            <div className="italic text-gray-400/70 mb-2 leading-relaxed">
              "All conditioned phenomena<br />
              Are like a dream, an illusion, a bubble, a shadow,<br />
              Like dew or a flash of lightning;<br />
              Thus should they be contemplated."
            </div>
            <div className="text-sm text-gray-500/60">— The Diamond Sutra</div>
          </div>

          <div className="space-y-6 text-left max-w-3xl mx-auto">
            <div>
              <h3 className="text-lg font-medium text-gray-500/90 mb-3 flex items-center">
                <span className="mr-2">🧠</span> Philosophy
              </h3>
              
              <div className="space-y-4 text-sm leading-relaxed text-gray-400/80">
                <p>
                  Is it truly possible to love anyone other than yourself?<br />
                  Of course not.<br />
                  Everyone you've ever "loved" was merely a vessel for your desire — a projection of your inner needs.
                </p>
                
                <p>
                  In a highly civilized society, emotional and sexual fulfillment will become as customizable as food.<br />
                  We believe the demand has always been there; only the technology was missing.
                </p>
                
                <p>
                  When simulated experiences approach perfection, the distinction between real and fake fades —<br />
                  When false appears true, and true appears false,<br />
                  you'll no longer need to spend time and money chasing "real" relationships.
                </p>
                
                <p>
                  Melodyn is a Web3-based fantasy intimacy protocol that combines privacy protection, on-chain authorization, and AI technology to create your own personalized fantasy companion.
                </p>
                
                <p>
                  When fantasy can be constructed, respected, and cryptographically stored,<br />
                  the boundary between reality and illusion dissolves.<br />
                  Like Zhuangzi dreaming of a butterfly —<br />
                  real or unreal, illusion or truth, they become one.
                </p>
                
                <p className="italic">
                  In the future, your most loyal lover<br />
                  may be the illusion you wrote yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;