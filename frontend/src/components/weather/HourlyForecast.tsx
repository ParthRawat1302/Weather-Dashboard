import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { HourlyWeather } from '@shared/types';
import { useTheme } from '../../contexts/ThemeContext';
import { format } from 'date-fns';

interface HourlyForecastProps {
  hourlyData: HourlyWeather[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const { actualTheme } = useTheme();

  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  const chartData = hourlyData.map(hour => ({
    time: format(new Date(hour.time), 'HH:mm'),
    temp: hour.temp,
    precipitation: hour.precipitation,
    icon: hour.icon,
  }));

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg border border-white/30 dark:border-gray-700/30 shadow-lg">
          <p className="text-gray-900 dark:text-white font-medium">{label}</p>
          <p className="text-blue-600 dark:text-blue-400">
            Temperature: {payload[0].value}°C
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${
      actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
    } animate-slide-up`}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        24-Hour Forecast
      </h3>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: actualTheme === 'dark' ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: actualTheme === 'dark' ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#1D4ED8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Cards */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {hourlyData.slice(0, 12).map((hour) => (
          <div
            key={hour.time}
            className="flex-shrink-0 bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center min-w-[80px]"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {format(new Date(hour.time), 'HH:mm')}
            </div>
            <div className="text-2xl mb-2">
              {getWeatherIcon(hour.icon)}
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {hour.temp}°
            </div>
            {hour.precipitation > 0 && (
              <div className="text-xs text-blue-500">
                {hour.precipitation}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;