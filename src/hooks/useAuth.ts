import { useState, useEffect } from 'react';

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
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'Alex Chen',
        email: 'alex.chen@gmail.com',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        provider: 'google',
        createdAt: new Date('2024-01-15'),
        nftCount: 3,
      };

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Google login failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      // Simulate email login
      await new Promise(resolve => setTimeout(resolve, 800));
      
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
    } catch (error) {
      console.error('Email login failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
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
  };
};