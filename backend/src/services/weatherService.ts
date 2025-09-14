import axios from 'axios';
import { WeatherData, CurrentWeather, HourlyWeather, DailyWeather, AirQuality, User } from '@shared/types/index.js';
import { createError } from '../middleware/errorHandler.js';

class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY!;
  }

  async getWeatherData(lat: number, lon: number, user?: User): Promise<WeatherData> {
    try {
      const isAuthenticated = !!user;
      
      // Get current weather and basic forecast
      const [currentResponse, geocodeResponse] = await Promise.all([
        axios.get(`${this.baseUrl}/weather`, {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric',
          },
        }),
        axios.get(`${this.baseUrl}/weather`, {
          params: {
            lat,
            lon,
            appid: this.apiKey,
          },
        }),
      ]);

      const current = this.mapCurrentWeather(currentResponse.data);
      const location = this.mapLocationInfo(geocodeResponse.data);

      // For authenticated users, get detailed data
      if (isAuthenticated) {
        const [forecastResponse, aqiResponse] = await Promise.all([
          axios.get(`${this.forecastUrl}`, {
            params: {
              lat,
              lon,
              appid: this.apiKey,
              units: 'metric',
            },
          }),
          this.getAirQuality(lat, lon),
        ]);

        const hourly = this.mapHourlyWeather(forecastResponse.data.list?.slice(0, 8) || []);
        const daily: DailyWeather[] = []; // Daily forecast not available in free tier

        return {
          current,
          hourly,
          daily,
          aqi: aqiResponse,
          location,
        };
      } else {
        // Limited data for guests
        return {
          current: {
            ...current,
            // Hide detailed metrics for guests
            humidity: 0,
            windSpeed: 0,
            windDirection: 0,
            pressure: 0,
            visibility: 0,
            uvIndex: 0,
            sunrise: '',
            sunset: '',
          },
          hourly: [],
          daily: [],
          location,
        };
      }
    } catch (error) {
      console.error('Weather API error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw createError('Location not found', 404, 'LOCATION_NOT_FOUND');
        }
        if (error.response?.status === 401) {
          throw createError('Invalid API key', 500, 'INVALID_API_KEY');
        }
        if (error.response?.status === 429) {
          throw createError('API rate limit exceeded', 429, 'RATE_LIMIT_EXCEEDED');
        }
      }
      
      throw createError('Weather service unavailable', 503, 'WEATHER_SERVICE_ERROR');
    }
  }

  private async getAirQuality(lat: number, lon: number): Promise<AirQuality | undefined> {
    try {
      const response = await axios.get(`${this.baseUrl}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
        },
      });

      const data = response.data.list[0];
      return {
        aqi: data.main.aqi,
        co: data.components.co,
        no: data.components.no,
        no2: data.components.no2,
        o3: data.components.o3,
        so2: data.components.so2,
        pm2_5: data.components.pm2_5,
        pm10: data.components.pm10,
      };
    } catch (error) {
      console.warn('Failed to get air quality data:', error);
      return undefined;
    }
  }

  private mapCurrentWeather(data: any): CurrentWeather {
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind?.speed * 3.6) || 0, // Convert m/s to km/h
      windDirection: data.wind?.deg || 0,
      pressure: data.main.pressure,
      visibility: Math.round((data.visibility || 0) / 1000), // Convert to km
      uvIndex: 0, // Will be updated from OneCall API
      sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
      sunset: new Date(data.sys.sunset * 1000).toISOString(),
      lastUpdated: new Date().toISOString(),
    };
  }

  private mapHourlyWeather(forecast: any[]): HourlyWeather[] {
    return forecast.map(item => ({
      time: new Date(item.dt * 1000).toISOString(),
              temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        precipitation: Math.round((item.pop || 0) * 100),
              windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
    }));
  }

  // Daily forecast mapping temporarily disabled - requires OneCall API subscription
  // private mapDailyWeather(forecast: any[]): DailyWeather[] {
  //   return [];
  // }

  private mapLocationInfo(data: any): { name: string; country: string; lat: number; lon: number } {
    return {
      name: data.name,
      country: data.sys.country,
      lat: data.coord.lat,
      lon: data.coord.lon,
    };
  }
}

export const weatherService = new WeatherService();