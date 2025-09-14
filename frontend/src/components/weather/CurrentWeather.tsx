import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun, 
  Sunset,
  Clock
} from 'lucide-react';
import { CurrentWeather as CurrentWeatherType } from '@shared/types';
import { useTheme } from '../../contexts/ThemeContext';
import { format } from 'date-fns';
import { useUser } from "../../hooks/useUser";



interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  locationName: string;
  isAuthenticated: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ 
  weather, 
  locationName, 
  isAuthenticated 
}) => {
  const { actualTheme } = useTheme();


  const { data: user } = useUser();
  const tempUnit = user?.units?.tempUnit || "C";
  const windUnit = user?.units?.windUnit || "kph";


  const getWeatherIcon = (icon: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[icon] || '☀️';
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '--:--';
    return format(new Date(dateString), 'HH:mm');
  };

  const toFahrenheit = (c: number) => (c * 9) / 5 + 32;
  const toMph = (kph: number) => kph / 1.609;

  const displayTemp = tempUnit === "F"
    ? `${toFahrenheit(weather.temp)}°F`
    : `${weather.temp}°C`;

  const displayFeelsLike = tempUnit === "F"
    ? `${Math.round(toFahrenheit(weather.feelsLike))}°F`
    : `${Math.round(weather.feelsLike)}°C`;

  const displayWind = windUnit === "mph"
    ? `${toMph(weather.windSpeed).toFixed(1)} mph`
    : `${weather.windSpeed} kph`;


  return (
    <div className={`${
      actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
    } animate-fade-in`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {locationName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Last updated: {format(new Date(weather.lastUpdated), 'HH:mm')}
          </p>
        </div>
        <div className="text-6xl float-animation">
          {getWeatherIcon(weather.icon)}
        </div>
      </div>

      {/* Main Temperature */}
      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
          {displayTemp}
        </div>
        <div className="text-xl text-gray-600 dark:text-gray-400 capitalize mb-2">
          {weather.description}
        </div>
        <div className="text-lg text-gray-500 dark:text-gray-500">
          Feels like {displayFeelsLike}
        </div>
      </div>

      {/* Detailed Metrics - Only for authenticated users */}
      {isAuthenticated && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center">
            <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {weather.humidity}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Humidity
            </div>
          </div>

          <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center">
            <Wind className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {weather.windSpeed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {displayWind} {/* happy */}
            </div>
          </div>

          <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center">
            <Gauge className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {weather.pressure}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              hPa
            </div>
          </div>

          <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center">
            <Eye className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {weather.visibility}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              km
            </div>
          </div>

          <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center">
            <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatTime(weather.sunrise)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Sunrise
            </div>
          </div>

          <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center">
            <Sunset className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatTime(weather.sunset)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Sunset
            </div>
          </div>

          <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center">
            <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {weather.uvIndex}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              UV Index
            </div>
          </div>

          <div className="bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center">
            <Wind className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {weather.windDirection}°
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Wind Dir
            </div>
          </div>
        </div>
      )}

      {/* Guest Message */}
      {!isAuthenticated && (
        <div className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
          <p className="text-center text-blue-700 dark:text-blue-300">
            🔒 Sign in with Google to see detailed weather metrics, hourly forecasts, and more!
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;