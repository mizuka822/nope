import React, { useState } from 'react';
import { X, Mail, Chrome } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (username: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/register
    const user = isLogin ? email.split('@')[0] : username;
    onLogin(user);
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    onLogin('GoogleUser');
  };

  const handleMetaMaskLogin = () => {
    // Simulate MetaMask login
    onLogin('0x1234...5678');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Welcome Back' : 'Join Melodyn'}
          </h2>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors"
                placeholder="Enter your username"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500/30 to-gray-500/30 backdrop-blur-sm border border-white/30 rounded-xl text-gray-700 font-medium hover:from-pink-500/40 hover:to-gray-500/40 transition-all duration-300 shadow-lg"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="space-y-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/10 text-gray-600">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-3 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Chrome className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Google</span>
          </button>

          <button
            onClick={handleMetaMaskLogin}
            className="w-full flex items-center justify-center space-x-3 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
          >
            <div className="w-5 h-5 bg-orange-500 rounded"></div>
            <span className="text-gray-700">MetaMask</span>
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-pink-600 hover:text-pink-500 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;