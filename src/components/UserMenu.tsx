import React, { useState } from 'react';
import { User, Settings, LogOut, Mail, Shield, Calendar, Zap } from 'lucide-react';
import { User as UserType } from '../hooks/useAuth';

interface UserMenuProps {
  user: UserType | null;
  isAuthenticated: boolean;
  onLoginWithGoogle: () => void;
  onLoginWithEmail: (email: string, password: string) => void;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  isAuthenticated,
  onLoginWithGoogle,
  onLoginWithEmail,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLoginWithEmail(email, password);
      setEmail('');
      setPassword('');
      setShowLogin(false);
      setIsOpen(false);
    }
  };

  const handleGoogleLogin = () => {
    onLoginWithGoogle();
    setShowLogin(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
    setShowSettings(false);
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
          <div className="absolute right-0 top-12 w-80 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 z-50">
            {!showLogin ? (
              <div className="text-center">
                <User className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome to Melodyn</h3>
                <p className="text-sm text-gray-600 mb-6">Sign in to access your AI companions and NFTs</p>
                
                <div className="space-y-3">
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-gradient-to-r from-red-500/20 to-red-400/20 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 hover:from-red-500/30 hover:to-red-400/30 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                  
                  <button
                    onClick={() => setShowLogin(true)}
                    className="w-full bg-gradient-to-r from-pink-500/20 to-gray-500/20 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Continue with Email</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Sign In</h3>
                  <button
                    onClick={() => setShowLogin(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pink-500/50"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pink-500/50"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500/20 to-gray-500/20 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 transition-all duration-300"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            )}
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
        <div className="absolute right-0 top-12 w-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-4 z-50">
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
            <div>
              <h4 className="font-semibold text-gray-800">{user?.name}</h4>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="absolute right-0 top-12 w-96 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 z-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">User Settings</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Profile Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Profile</h4>
              <div className="flex items-center space-x-4 mb-4">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-gray-500/20 flex items-center justify-center">
                    <User className="w-8 h-8 text-pink-600" />
                  </div>
                )}
                <div>
                  <h5 className="font-medium text-gray-800">{user?.name}</h5>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <p className="text-xs text-gray-500">
                    {user?.provider === 'google' ? 'Google Account' : 'Email Account'}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Account Details</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Member Since</p>
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
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;