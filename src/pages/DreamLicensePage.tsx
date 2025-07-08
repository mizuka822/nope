import React from 'react';
import { Sparkles, Shield, Zap, Users, Star, Heart } from 'lucide-react';

const DreamLicensePage: React.FC = () => {
  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-pink-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-gray-600 bg-clip-text text-transparent mb-4">
            DreamLicense NFT
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mint exclusive NFT licenses with ZK authorization for your dream figures
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500/20 to-gray-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-pink-600">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Upload Dream Data</h3>
                  <p className="text-sm text-gray-600">Idols and virtual characters upload their personality, voice, and interaction styles</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500/20 to-gray-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-pink-600">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Mint NFT License</h3>
                  <p className="text-sm text-gray-600">Create a unique ERC-721 NFT that serves as an exclusive license for fantasy use</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500/20 to-gray-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-pink-600">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">ZK Authorization</h3>
                  <p className="text-sm text-gray-600">Zero-knowledge proofs ensure private, secure access to dream experiences</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">License Features</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-pink-600" />
                <span className="text-gray-700">Zero-Knowledge Privacy Protection</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-pink-600" />
                <span className="text-gray-700">Non-Transferable & Exclusive</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-pink-600" />
                <span className="text-gray-700">Personalized AI Companion</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-pink-600" />
                <span className="text-gray-700">Premium Interaction Quality</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-pink-600" />
                <span className="text-gray-700">Memory & Personality Evolution</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-pink-500/20 to-gray-500/20 backdrop-blur-sm border border-white/30 rounded-xl py-4 px-8 text-lg font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-pink-500/20">
            Browse Available Licenses
          </button>
        </div>
      </div>
    </div>
  );
};

export default DreamLicensePage;