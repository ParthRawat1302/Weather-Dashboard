import React from 'react';
import { Wind, AlertTriangle, CheckCircle } from 'lucide-react';
import { AirQuality as AirQualityType } from '@shared/types';
import { useTheme } from '../../contexts/ThemeContext';

interface AirQualityProps {
  aqi: AirQualityType;
}

const AirQuality: React.FC<AirQualityProps> = ({ aqi }) => {
  const { actualTheme } = useTheme();

  const getAQIInfo = (aqiValue: number) => {
    if (aqiValue === 1) return { label: 'Good', color: 'text-green-500', bgColor: 'bg-green-500/20', icon: CheckCircle };
    if (aqiValue === 2) return { label: 'Fair', color: 'text-yellow-500', bgColor: 'bg-yellow-500/20', icon: CheckCircle };
    if (aqiValue === 3) return { label: 'Moderate', color: 'text-orange-500', bgColor: 'bg-orange-500/20', icon: AlertTriangle };
    if (aqiValue === 4) return { label: 'Poor', color: 'text-red-500', bgColor: 'bg-red-500/20', icon: AlertTriangle };
    return { label: 'Very Poor', color: 'text-purple-500', bgColor: 'bg-purple-500/20', icon: AlertTriangle };
  };

  const aqiInfo = getAQIInfo(aqi.aqi);
  const AQIIcon = aqiInfo.icon;

  const pollutants = [
    { name: 'CO', value: aqi.co, unit: 'μg/m³', label: 'Carbon Monoxide' },
    { name: 'NO₂', value: aqi.no2, unit: 'μg/m³', label: 'Nitrogen Dioxide' },
    { name: 'O₃', value: aqi.o3, unit: 'μg/m³', label: 'Ozone' },
    { name: 'SO₂', value: aqi.so2, unit: 'μg/m³', label: 'Sulfur Dioxide' },
    { name: 'PM2.5', value: aqi.pm2_5, unit: 'μg/m³', label: 'Fine Particles' },
    { name: 'PM10', value: aqi.pm10, unit: 'μg/m³', label: 'Coarse Particles' },
  ];

  return (
    <div className={`${
      actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
    } animate-slide-up`}>
      <div className="flex items-center space-x-3 mb-6">
        <Wind className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Air Quality Index
        </h3>
      </div>

      {/* AQI Score */}
      <div className={`${aqiInfo.bgColor} rounded-2xl p-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {6-aqi.aqi}/5
            </div>
            <div className={`text-lg font-semibold ${aqiInfo.color} flex items-center`}>
              <AQIIcon className="w-5 h-5 mr-2" />
              {aqiInfo.label}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Air Quality
            </div>
            <div className="text-2xl">
              {aqi.aqi <= 2 ? '😊' : aqi.aqi === 3 ? '😐' : '😷'}
            </div>
          </div>
        </div>
      </div>

      {/* Pollutant Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pollutants.map((pollutant) => (
          <div
            key={pollutant.name}
            className="bg-white/10 dark:bg-black/10 rounded-xl p-4 text-center"
          >
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {pollutant.value.toFixed(1)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              {pollutant.unit}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {pollutant.name}
            </div>
          </div>
        ))}
      </div>

      {/* Health Recommendations */}
      <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          Health Recommendations
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {aqi.aqi <= 2 && "Air quality is good. Perfect for outdoor activities!"}
          {aqi.aqi === 3 && "Air quality is moderate. Sensitive individuals should consider limiting outdoor activities."}
          {aqi.aqi >= 4 && "Air quality is poor. Consider staying indoors and avoiding outdoor exercise."}
        </p>
      </div>
    </div>
  );
};

export default AirQuality;