import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';

const AuthError: React.FC = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.REACT_APP_API_URL;

  const handleRetry = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Authentication Failed
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn't sign you in with Google. This might be due to a temporary issue 
            or you may have cancelled the sign-in process.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={handleRetry}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Note:</strong> You can still use Mausam as a guest with limited features, 
            or try signing in again to access the full dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthError;