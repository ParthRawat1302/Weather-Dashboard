import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWeather } from '../hooks/useWeather';
import { useAddLocation } from '../hooks/useUser';
import SearchBar from '../components/weather/SearchBar';
import CurrentWeather from '../components/weather/CurrentWeather';
import HourlyForecast from '../components/weather/HourlyForecast';
import DailyForecast from '../components/weather/DailyForecast';
import AirQuality from '../components/weather/AirQuality';
import SavedLocations from '../components/weather/SavedLocations';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { AutocompleteResult, SavedLocation } from '@shared/types';


const DashboardPage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [currentLocation, setCurrentLocation] = useState<{
    name: string;
    lat: number;
    lon: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const addLocationMutation = useAddLocation();

  const { data: weatherData, isLoading, error } = useWeather(
    undefined,
    currentLocation?.lat,
    currentLocation?.lon
  );

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            // Fetch city name using reverse geocoding
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            const data = await response.json();

            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state; // fallback if city not available

            setCurrentLocation({
              name: city || "Unknown Location",
              lat,
              lon,
            });
            setLocationError(null);
          } catch (err) {
            console.error("Reverse geocoding error:", err);
            setCurrentLocation({
              name: "Unknown Location",
              lat,
              lon,
            });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError(
            "Unable to get your location. Please search for a city."
          );
          setCurrentLocation({
            name: "New York",
            lat: 40.7128,
            lon: -74.006,
          });
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      setCurrentLocation({
        name: "New York",
        lat: 40.7128,
        lon: -74.006,
      });
    }
  }, []);


  const handleLocationSelect = (location: AutocompleteResult) => {
    const displayName =
      location.name && location.name.trim() !== ""
        ? location.name
        : location.state || location.country || "Unknown";

    setCurrentLocation({
      name: `${displayName}, ${location.country}`,
      lat: location.lat,
      lon: location.lon,
    });
    setLocationError(null);
  };


  const handleSavedLocationSelect = (location: SavedLocation) => {
    setCurrentLocation({
      name: location.name,
      lat: location.lat,
      lon: location.lon,
    });
  };

  const handleAddCurrentLocation = () => {
    if (!currentLocation || !isAuthenticated) return;

    console.log("current location:"+currentLocation.name)
    addLocationMutation.mutate({
      name: currentLocation.name,
      lat: currentLocation.lat,
      lon: currentLocation.lon,
    });
  };

  if (!currentLocation && !locationError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Getting your location...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Weather Dashboard
          </h1>

          {/* search Bar */}

          <div className="max-w-2xl relative">
            {/* The SearchBar */}
            <SearchBar
              onLocationSelect={handleLocationSelect}
              placeholder="Search for any city..."
            />
          </div>

          {/* Location Error */}
          {locationError && (
            <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-yellow-700 dark:text-yellow-300">{locationError}</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Saved Locations */}
          {isAuthenticated && (
            <div className="lg:col-span-1">
              <SavedLocations
                onLocationSelect={handleSavedLocationSelect}
                onAddLocation={currentLocation ? handleAddCurrentLocation : undefined}
              />
            </div>
          )}

          {/* Main Weather Content */}
          <div className={`${isAuthenticated ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-8`}>
            {isLoading && (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            )}

            {error && (
              <div className="glass dark:glass-dark rounded-2xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Unable to Load Weather Data
                </h3>
                 <p className="text-red-600 dark:text-red-400 mb-2 break-all">
                  {error?.message || String(error)}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Please try searching for another location or check your internet connection.
                </p>
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            )}

            {weatherData && currentLocation && (
              <>
                {/* Current Weather */}
                <CurrentWeather
                  weather={weatherData.current}
                  locationName={currentLocation.name}
                  isAuthenticated={isAuthenticated}
                />

                {/* Guest Upgrade Banner */}
                {!isAuthenticated && (
                  <div className="glass dark:glass-dark rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      🔓 Unlock Full Weather Intelligence
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Sign in with Google to access detailed hourly forecasts, 7-day outlook,
                      air quality monitoring, and save your favorite locations.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={login}
                      className="flex items-center space-x-2 mx-auto"
                    >
                      <span>Sign in with Google</span>
                      <MapPin className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Authenticated User Features */}
                {isAuthenticated && (
                  <>
                    {/* Air Quality */}
                    {weatherData.aqi && (
                      <AirQuality aqi={weatherData.aqi} />
                    )}

                    {/* Hourly Forecast */}
                    {weatherData.hourly && weatherData.hourly.length > 0 && (
                      <HourlyForecast hourlyData={weatherData.hourly} />
                    )}

                    {/* Daily Forecast */}
                    {weatherData.daily && weatherData.daily.length > 0 && (
                      <DailyForecast dailyData={weatherData.daily} />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;