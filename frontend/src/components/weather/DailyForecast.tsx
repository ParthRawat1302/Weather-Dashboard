import React from 'react';
import { DailyWeather } from '@shared/types';
import { useTheme } from '../../contexts/ThemeContext';
import { format } from 'date-fns';

interface DailyForecastProps {
  dailyData: DailyWeather[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ dailyData }) => {
  const { actualTheme } = useTheme();

  if (!dailyData || dailyData.length === 0) {
    return null;
  }

  const getWeatherIcon = (icon: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '☀️',
      '02d': '⛅', '02n': '⛅',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌦️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[icon] || '☀️';
  };

  const getDayName = (dateString: string, index: number) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    return format(new Date(dateString), 'EEEE');
  };

  return (
    <div className={`${
      actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
    } animate-slide-up`}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        7-Day Forecast
      </h3>

      <div className="space-y-4">
        {dailyData.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between p-4 bg-white/10 dark:bg-black/10 rounded-xl hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
          >
            {/* Day */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 dark:text-white">
                {getDayName(day.date, index)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {day.description}
              </div>
            </div>

            {/* Weather Icon */}
            <div className="text-3xl mx-4">
              {getWeatherIcon(day.icon)}
            </div>

            {/* Precipitation */}
            {day.precipitation > 0 && (
              <div className="text-center mx-4">
                <div className="text-sm text-blue-500 font-medium">
                  {day.precipitation}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Rain
                </div>
              </div>
            )}

            {/* Temperature Range */}
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {day.tempMax}°
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-400">
                  {day.tempMin}°
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;