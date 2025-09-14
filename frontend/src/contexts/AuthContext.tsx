import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '@shared/types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const API_BASE_URL =import.meta.env.VITE_API_URL;
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshAuth = async () => {
    try {
      const response = await authService.refreshToken();
      setUser(response.user);
      localStorage.setItem('accessToken', response.accessToken);
    } catch (error) {
      console.error('Auth refresh failed:', error);
      setUser(null);
      localStorage.removeItem('accessToken');
    }
  };

  const setAuthData = (authData: AuthResponse) => {
    setUser(authData.user);
    console.log('Auth data set:', authData.user);
    localStorage.setItem('accessToken', authData.accessToken);
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          // Try to refresh to get fresh user data
          await refreshAuth();
        } catch (error) {
          console.error('Initial auth check failed:', error);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Handle auth success from OAuth callback
  useEffect(() => {
    const handleAuthSuccess = (event: CustomEvent) => {
      const authData = event.detail as AuthResponse;
      setAuthData(authData);
    };

    window.addEventListener('authSuccess', handleAuthSuccess as EventListener);
    return () => {
      window.removeEventListener('authSuccess', handleAuthSuccess as EventListener);
    };
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};