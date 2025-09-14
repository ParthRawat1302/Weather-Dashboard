import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const API_BASE_URL = import.meta.env.REACT_APP_API_URL;


  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store the access token
      localStorage.setItem('accessToken', token);
      
      // Try to get user data and dispatch success event
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });
          
          if (response.ok) {
            const authData = await response.json();
            
            // Dispatch custom event to update auth context
            window.dispatchEvent(new CustomEvent('authSuccess', {
              detail: authData
            }));
            
            // Redirect to dashboard
            setTimeout(() => {
              navigate('/app', { replace: true });
            }, 1500);
          } else {
            throw new Error('Failed to get user data');
          }
        } catch (error) {
          console.error('Auth success error:', error);
          navigate('/auth/error', { replace: true });
        }
      };

      fetchUserData();
    } else {
      navigate('/auth/error', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-scale-in" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Mausam!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You've successfully signed in with Google
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <LoadingSpinner size="sm" />
          <span className="text-gray-600 dark:text-gray-400">
            Setting up your dashboard...
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;