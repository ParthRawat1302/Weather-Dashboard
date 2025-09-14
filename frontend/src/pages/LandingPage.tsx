import React, { useState } from 'react';
import { Cloud, ArrowRight, CheckCircle, Users, Globe, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWeather } from '../hooks/useWeather';
import SearchBar from '../components/weather/SearchBar';
import CurrentWeather from '../components/weather/CurrentWeather';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { AutocompleteResult } from '@shared/types';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<AutocompleteResult | null>(null);
  
  const { data: weatherData, isLoading, error } = useWeather(
    undefined,
    selectedLocation?.lat,
    selectedLocation?.lon
  );

  const handleLocationSelect = (location: AutocompleteResult) => {
    setSelectedLocation(location);
  };

  const features = [
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Get weather data for any city worldwide with accurate forecasts'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: Users,
      title: 'Personalized Experience',
      description: 'Save locations, customize units, and get tailored weather insights'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Cloud className="w-20 h-20 text-blue-500 float-animation" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 text-shadow-lg">
              <span className="gradient-text dark:gradient-text-dark">Mau</span>
              <span className="text-gray-900 dark:text-white">Sam</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Your professional weather companion with real-time data, detailed forecasts, 
              and air quality monitoring powered by advanced meteorological APIs.
            </p>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-12">
              <SearchBar
                onLocationSelect={handleLocationSelect}
                placeholder="Search any city worldwide..."
                className="mb-6"
              />
              
              {!isAuthenticated && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={login}
                    className="flex items-center space-x-2"
                  >
                    <span>Sign in with Google</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/app')}
                  >
                    Continue as Guest
                  </Button>
                </div>
              )}
            </div>

            {/* Weather Preview */}
            {isLoading && (
              <div className="flex justify-center">
                <LoadingSpinner size="lg" />
              </div>
            )}

            {error && (
              <div className="max-w-md mx-auto p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-700 dark:text-red-300">
                  Unable to load weather data. Please try another city.
                </p>
              </div>
            )}

            {weatherData && selectedLocation && (
              <div className="max-w-2xl mx-auto animate-fade-in">
                <CurrentWeather
                  weather={weatherData.current}
                  locationName={`${selectedLocation.name}, ${selectedLocation.country}`}
                  isAuthenticated={isAuthenticated}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Mausam?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional-grade weather intelligence with enterprise security and global coverage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass dark:glass-dark rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass dark:glass-dark rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of users who trust Mausam for accurate weather insights
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={login}
                    className="flex items-center space-x-2"
                  >
                    <span>Sign in with Google</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/app')}
                  >
                    Try as Guest
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/app')}
                  className="flex items-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}
            </div>

            <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;