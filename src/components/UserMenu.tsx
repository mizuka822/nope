import React, { useState } from 'react';
import { User, Settings, LogOut, Wallet, Shield, Calendar, Zap, Camera, Edit3, Image, Star, Copy, ExternalLink } from 'lucide-react';
import { User as UserType } from '../hooks/useAuth';

interface UserMenuProps {
  user: UserType | null;
  isAuthenticated: boolean;
  onLoginWithWallet: () => void;
  onLogout: () => void;
  isLoading: boolean;
  error: string | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  isAuthenticated,
  onLoginWithWallet,
  onLogout,
  isLoading,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingNickname, setEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(user?.name || '');
  const [copied, setCopied] = useState(false);

  const handleWalletLogin = () => {
    onLoginWithWallet();
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
    setShowSettings(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // In a real app, you'd upload to IPFS or a decentralized storage
        console.log('Avatar uploaded:', event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameEdit = () => {
    setEditingNickname(true);
    setNickname(user?.name || '');
  };

  const handleNicknameSave = () => {
    // In a real app, you'd update the user profile on-chain or in decentralized storage
    console.log('Nickname updated:', nickname);
    setEditingNickname(false);
  };

  const copyAddress = () => {
    if (user?.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-300/20 flex items-center justify-center hover:from-gray-400/30 hover:to-gray-300/30 transition-all duration-300"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 z-50">
            <div className="text-center">
              <Wallet className="w-12 h-12 mx-auto mb-4 text-pink-600" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Connect Your Wallet</h3>
              <p className="text-sm text-gray-600 mb-6">Connect your MetaMask wallet to access Melodyn and your NFTs</p>
              
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <button
                onClick={handleWalletLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500/20 to-orange-400/20 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 hover:from-orange-500/30 hover:to-orange-400/30 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.05 9.78l-1.26-4.25c-.34-1.15-1.4-1.98-2.6-2.04L9.78 2.22c-1.15-.34-2.37.18-3.02 1.26L2.22 9.78c-.34 1.15.18 2.37 1.26 3.02l4.25 1.26c1.15.34 2.37-.18 3.02-1.26l4.54-6.3c.65-1.08 2.05-1.42 3.13-.77.5.3.9.76 1.1 1.3l1.26 4.25c.34 1.15-.18 2.37-1.26 3.02l-4.25 1.26c-1.15.34-2.37-.18-3.02-1.26l-4.54-6.3c-.65-1.08-2.05-1.42-3.13-.77-.5.3-.9.76-1.1 1.3L2.22 14.22c-.34 1.15.18 2.37 1.26 3.02l4.25 1.26c1.15.34 2.37-.18 3.02-1.26l4.54-6.3c.65-1.08 2.05-1.42 3.13-.77.5.3.9.76 1.1 1.3l1.26 4.25c.34 1.15-.18 2.37-1.26 3.02l-4.25 1.26c-1.15.34-2.37-.18-3.02-1.26l-4.54-6.3c-.65-1.08-2.05-1.42-3.13-.77-.5.3-.9.76-1.1 1.3z"/>
                    </svg>
                    <span>Connect MetaMask</span>
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 mt-4">
                Don't have MetaMask? <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Download here</a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-pink-500/50 transition-all duration-300"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-gray-500/20 flex items-center justify-center">
            <User className="w-5 h-5 text-pink-600" />
          </div>
        )}
      </button>

      {isOpen && !showSettings && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-4 z-50">
          <div className="flex items-center space-x-3 mb-4">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-gray-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-pink-600" />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{user?.name}</h4>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-gray-600 font-mono">{user?.walletAddress ? formatAddress(user.walletAddress) : ''}</p>
                <button
                  onClick={copyAddress}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  title="Copy address"
                >
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          
          {copied && (
            <div className="mb-3 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-xs text-green-600 text-center">Address copied to clipboard!</p>
            </div>
          )}
          
          <div className="space-y-2">
            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            
            <button
              onClick={() => window.open(`https://etherscan.io/address/${user?.walletAddress}`, '_blank')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Etherscan</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect Wallet</span>
            </button>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="absolute right-0 top-full mt-2 w-[480px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 z-50 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Wallet Settings</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Avatar Upload Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Avatar</h4>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-gray-500/20 flex items-center justify-center">
                      <User className="w-10 h-10 text-pink-600" />
                    </div>
                  )}
                  <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-pink-500/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-500 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">Upload a new avatar to IPFS</p>
                  <div className="flex space-x-2">
                    <label className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-gray-500/20 backdrop-blur-sm border border-white/30 rounded-lg text-xs font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 transition-all duration-300 cursor-pointer flex items-center space-x-1">
                      <Image className="w-3 h-3" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Nickname Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Display Name</h4>
              <div className="flex items-center space-x-3">
                {editingNickname ? (
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pink-500/50"
                      placeholder="Enter your display name"
                    />
                    <button
                      onClick={handleNicknameSave}
                      className="px-3 py-2 bg-gradient-to-r from-green-500/20 to-green-400/20 backdrop-blur-sm border border-white/30 rounded-lg text-xs font-medium text-green-600 hover:from-green-500/30 hover:to-green-400/30 transition-all duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingNickname(false)}
                      className="px-3 py-2 bg-gradient-to-r from-gray-500/20 to-gray-400/20 backdrop-blur-sm border border-white/30 rounded-lg text-xs font-medium text-gray-600 hover:from-gray-500/30 hover:to-gray-400/30 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-gray-800">{user?.name}</span>
                    <button
                      onClick={handleNicknameEdit}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Wallet Information */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Wallet Information</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Wallet Address</p>
                      <p className="text-xs text-gray-600 font-mono">{user?.walletAddress}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyAddress}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Copy address"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => window.open(`https://etherscan.io/address/${user?.walletAddress}`, '_blank')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="View on Etherscan"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Owned NFTs Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Owned NFTs</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-pink-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">DreamLicense NFTs</p>
                      <p className="text-xs text-gray-600">{user?.nftCount || 0} owned</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-gray-500/20 backdrop-blur-sm border border-white/30 rounded-lg text-xs font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 transition-all duration-300">
                    View All
                  </button>
                </div>
                
                {/* Mock NFT Preview */}
                {user?.nftCount && user.nftCount > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900/10 rounded-lg p-3">
                      <img
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Aurora Dream"
                        className="w-full h-16 object-cover rounded-lg mb-2"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700">Aurora Dream</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">#1</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/10 rounded-lg p-3">
                      <img
                        src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Luna Mystery"
                        className="w-full h-16 object-cover rounded-lg mb-2"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700">Luna Mystery</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">#2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Details */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Account Details</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Connected Since</p>
                    <p className="text-xs text-gray-600">{user ? formatDate(user.createdAt) : ''}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                  <Zap className="w-4 h-4 text-pink-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Owned NFTs</p>
                    <p className="text-xs text-gray-600">{user?.nftCount || 0} DreamLicense NFTs</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                  <Shield className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Privacy Status</p>
                    <p className="text-xs text-gray-600">Zero-Knowledge Protected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500/20 to-red-400/20 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-sm font-medium text-red-600 hover:from-red-500/30 hover:to-red-400/30 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;