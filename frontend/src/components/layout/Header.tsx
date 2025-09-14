import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cloud, Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { isAuthenticated, login, logout, user: authUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const themeIcons = {
    light: Sun,
    dark: Moon,
  };

  const ThemeIcon = themeIcons[theme];

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark'> = ['light', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}

          <Link to="/" className="flex items-center space-x-2 group">
            <Cloud className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
            <span className="text-xl font-bold text-shadow-lg">
              <span className="gradient-text dark:gradient-text-dark">Mau</span>
              <span className="text-gray-900 dark:text-white">Sam</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${location.pathname === '/'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
                }`}
            >
              Home
            </Link>
            <Link
              to="/app"
              className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${location.pathname === '/app'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
                }`}
            >
              Dashboard
            </Link>
            {isAuthenticated && (
              <Link
                to="/settings"
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${location.pathname === '/settings'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                  }`}
              >
                Settings
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
              title={`Current theme: ${theme}`}
            >
              <ThemeIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {authUser?.photoUrl && (
                  <img
                    src={authUser.photoUrl}
                    alt={authUser.name}
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                  />
                )}
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {authUser?.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="p-2"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={login}
                className="flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

