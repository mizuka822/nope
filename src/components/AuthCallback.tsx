import React, { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AuthCallback: React.FC = () => {
  const { handleGoogleCallback, isLoading } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      // Redirect back to home with error
      window.location.href = '/?auth_error=' + encodeURIComponent(error);
      return;
    }

    if (code) {
      handleGoogleCallback(code);
    } else {
      // No code found, redirect to home
      window.location.href = '/';
    }
  }, [handleGoogleCallback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl text-center">
        <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-pink-600" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Completing Authentication</h2>
        <p className="text-gray-600">Please wait while we verify your credentials...</p>
      </div>
    </div>
  );
};

export default AuthCallback;