import React, { useState } from 'react';
import { ArrowLeft, Star, Users, Zap, Heart, MessageCircle, Play, Wallet } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  image: string;
  personality: string;
  interactions: number;
  rating: number;
  price: string;
  tags?: string[];
}

interface CharacterDetailPageProps {
  character: Character;
  onBack: () => void;
}

const CharacterDetailPage: React.FC<CharacterDetailPageProps> = ({ character, onBack }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    
    // Simulate wallet connection and smart contract interaction
    try {
      // Simulate contract call: contract.buyNFT(tokenId, { value: ethers.utils.parseEther(price) })
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsPurchasing(false);
      setShowSuccess(true);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setIsPurchasing(false);
      // Handle error (insufficient balance, transaction rejected, etc.)
      alert('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 mb-8 text-gray-600 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Characters</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Character Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={character.image} 
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-yellow-500/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-2">
              <Star className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">{character.rating}</span>
            </div>
          </div>

          {/* Character Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{character.name}</h1>
              <p className="text-lg text-gray-600">{character.personality}</p>
            </div>

            {/* Tags */}
            {character.tags && (
              <div className="flex flex-wrap gap-2">
                {character.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-pink-500/20 text-pink-700 text-sm rounded-full border border-pink-300/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">Interactions</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{character.interactions}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-pink-600" />
                  <span className="text-sm text-gray-600">Price</span>
                </div>
                <p className="text-2xl font-bold text-pink-600">{character.price}</p>
              </div>
            </div>

            {/* Character Bio */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Character Profile</h3>
              <p className="text-gray-600 leading-relaxed">
                {character.name} is a unique AI companion with carefully crafted personality traits and interaction patterns. 
                Each conversation builds upon previous interactions, creating a truly personalized and evolving relationship. 
                This DreamLicense NFT grants you exclusive access to {character.name}'s complete personality matrix, 
                voice patterns, and memory system.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                className="w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all duration-300 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.2))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50px'
                }}
              >
                <Play className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Try Demo</span>
              </button>

              <button 
                onClick={handlePurchase}
                disabled={isPurchasing}
                className="w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(156, 163, 175, 0.3))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50px'
                }}
              >
                <Wallet className="w-5 h-5 text-pink-600" />
                <span className="text-pink-700 font-medium">
                  {isPurchasing ? 'Processing...' : 'Buy DreamLicense'}
                </span>
              </button>
            </div>

            {/* Features List */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">What's Included</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <span className="text-gray-700">Exclusive AI companion access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Unlimited conversations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700">Memory evolution system</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Premium interaction quality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Purchase Successful!</h3>
              <p className="text-gray-600 mb-4">
                You now own the DreamLicense NFT for {character.name}
              </p>
              <p className="text-sm text-gray-500">
                Token ID: #{character.id}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetailPage;