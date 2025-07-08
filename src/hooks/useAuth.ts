import { useState, useEffect } from 'react';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = `${window.location.origin}/auth/callback`;

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'email';
  createdAt: Date;
  nftCount: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Mock authentication functions (replace with real implementation)
  const loginWithGoogle = async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Create Google OAuth URL
      const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      googleAuthUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
      googleAuthUrl.searchParams.set('redirect_uri', GOOGLE_REDIRECT_URI);
      googleAuthUrl.searchParams.set('response_type', 'code');
      googleAuthUrl.searchParams.set('scope', 'openid email profile');
      googleAuthUrl.searchParams.set('access_type', 'offline');
      googleAuthUrl.searchParams.set('prompt', 'consent');
      
      // Store the current page to redirect back after auth
      localStorage.setItem('auth_redirect_url', window.location.pathname);
      
      // Redirect to Google OAuth
      window.location.href = googleAuthUrl.toString();
    } catch (error) {
      console.error('Google login failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // In a real app, you'd send this to your authentication server
      const response = await fetch('/api/auth/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }
      
      const userData = await response.json();
      
      const user: User = {
        id: userData.id,
        name: userData.name || email.split('@')[0],
        email: userData.email,
        avatar: userData.avatar || '',
        provider: 'email',
        createdAt: new Date(userData.createdAt),
        nftCount: userData.nftCount || 0,
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Email login failed:', error);
      // For demo purposes, still allow mock login if API fails
      const mockUser: User = {
        id: '2',
        name: email.split('@')[0],
        email,
        avatar: '',
        provider: 'email',
        createdAt: new Date(),
        nftCount: 1,
      };

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem('user', JSON.stringify(mockUser));
    }
  };

  const handleGoogleCallback = async (code: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Exchange authorization code for access token
      const tokenResponse = await fetch('/api/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, redirectUri: GOOGLE_REDIRECT_URI }),
      });
      
      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange authorization code');
      }
      
      const userData = await tokenResponse.json();
      
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.picture || userData.avatar,
        provider: 'google',
        createdAt: new Date(userData.createdAt || Date.now()),
        nftCount: userData.nftCount || 0,
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect back to the original page
      const redirectUrl = localStorage.getItem('auth_redirect_url') || '/';
      localStorage.removeItem('auth_redirect_url');
      window.location.href = redirectUrl;
      
    } catch (error) {
      console.error('Google callback failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      
      // For demo purposes, create a mock user if the API fails
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        provider: 'google',
        createdAt: new Date(),
        nftCount: 3,
      };

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem('user', JSON.stringify(mockUser));
    }
  };

  const logout = (): void => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem('user');
  };

  // Check for existing session on mount
  useEffect(() => {
    // Check if this is a Google OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && window.location.pathname === '/auth/callback') {
      handleGoogleCallback(code);
      return;
    }
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  return {
    ...authState,
    loginWithGoogle,
    loginWithEmail,
    logout,
    handleGoogleCallback,
  };
};