import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Thermometer, Wind, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUser, useUpdateUser, useSavedLocations, useRemoveLocation } from '../hooks/useUser';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user: authUser } = useAuth();
  const { actualTheme } = useTheme();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: savedLocations = [] } = useSavedLocations();
  const updateUserMutation = useUpdateUser();
  const removeLocationMutation = useRemoveLocation();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    tempUnit: user?.units.tempUnit || 'C',
    windUnit: user?.units.windUnit || 'kph',
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        tempUnit: user.units.tempUnit,
        windUnit: user.units.windUnit,
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`${
          actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
        } text-center max-w-md`}>
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to sign in to access your settings and manage your profile.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
            >
              Go Home
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/app')}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({
      name: formData.name,
      units: {
        tempUnit: formData.tempUnit as 'C' | 'F',
        windUnit: formData.windUnit as 'kph' | 'mph',
      },
    });
  };

  const handleRemoveLocation = (locationId: string) => {
    if (window.confirm('Are you sure you want to remove this location?')) {
      removeLocationMutation.mutate(locationId);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/app')}
            className="mb-4 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your profile and preferences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className={`${
            actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Profile
              </h2>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-white/10 dark:bg-black/10 rounded-xl">
              {authUser?.photoUrl && (
                <img
                  src={authUser.photoUrl}
                  alt={authUser.name}
                  className="w-16 h-16 rounded-full border-2 border-white/30"
                />
              )}
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {authUser?.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {authUser?.email}
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Display Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your display name"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Thermometer className="w-4 h-4 inline mr-1" />
                  Temperature Unit
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="C"
                      checked={formData.tempUnit === 'C'}
                      onChange={(e) => setFormData({ ...formData, tempUnit: e.target.value as 'C' | 'F' })}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">Celsius (°C)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="F"
                      checked={formData.tempUnit === 'F'}
                      onChange={(e) => setFormData({ ...formData, tempUnit: e.target.value as 'C' | 'F' })}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">Fahrenheit (°F)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Wind className="w-4 h-4 inline mr-1" />
                  Wind Speed Unit
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="kph"
                      checked={formData.windUnit === 'kph'}
                      onChange={(e) => setFormData({ ...formData, windUnit: e.target.value as 'kph' | 'mph' })}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">km/h</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="mph"
                      checked={formData.windUnit === 'mph'}
                      onChange={(e) => setFormData({ ...formData, windUnit: e.target.value as 'kph' | 'mph' })}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">mph</span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={updateUserMutation.isPending}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
            </form>
          </div>

          {/* Saved Locations */}
          <div className={`${
            actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Saved Locations
              </h2>
            </div>

            {savedLocations.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No saved locations yet
                </p>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/app')}
                >
                  Add Locations
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {savedLocations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between p-4 bg-white/10 dark:bg-black/10 rounded-xl"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {location.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveLocation(location.id)}
                      className="text-red-500 hover:bg-red-500/20"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;