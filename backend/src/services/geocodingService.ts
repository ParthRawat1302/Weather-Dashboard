import axios from 'axios';
import { AutocompleteResult } from '@shared/types/index.js';
import { createError } from '../middleware/errorHandler.js';

class GeocodingService {
  private provider: string;
  private apiKey?: string;
  private openWeatherKey: string;

  constructor() {
    this.provider = process.env.GEOCODING_PROVIDER || 'openweather';
    this.apiKey = process.env.GEOCODING_API_KEY;
    this.openWeatherKey = process.env.OPENWEATHER_API_KEY!;
  }

  async geocodeCity(cityName: string): Promise<{ lat: number; lon: number }> {
    try {
      if (this.provider === 'opencage' && this.apiKey) {
        return this.geocodeWithOpenCage(cityName);
      } else {
        return this.geocodeWithOpenWeather(cityName);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      throw createError('Failed to find location', 404, 'GEOCODING_FAILED');
    }
  }

  async searchCities(query: string): Promise<AutocompleteResult[]> {
    try {
      if (this.provider === 'opencage' && this.apiKey) {
        return this.searchWithOpenCage(query);
      } else {
        return this.searchWithOpenWeather(query);
      }
    } catch (error) {
      console.error('City search error:', error);
      return [];
    }
  }

  private async geocodeWithOpenWeather(cityName: string): Promise<{ lat: number; lon: number }> {
    const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: cityName,
        limit: 1,
        appid: this.openWeatherKey,
      },
    });

    if (!response.data.length) {
      throw createError('City not found', 404, 'CITY_NOT_FOUND');
    }

    const location = response.data[0];
    return {
      lat: location.lat,
      lon: location.lon,
    };
  }

  private async geocodeWithOpenCage(cityName: string): Promise<{ lat: number; lon: number }> {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: cityName,
        key: this.apiKey,
        limit: 1,
        no_annotations: 1,
      },
    });

    if (!response.data.results.length) {
      throw createError('City not found', 404, 'CITY_NOT_FOUND');
    }

    const location = response.data.results[0].geometry;
    return {
      lat: location.lat,
      lon: location.lng,
    };
  }

  private async searchWithOpenWeather(query: string): Promise<AutocompleteResult[]> {
    const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: query,
        limit: 10,
        appid: this.openWeatherKey,
      },
    });

    return response.data.map((location: any) => ({
      name: location.name,
      country: location.country,
      state: location.state,
      lat: location.lat,
      lon: location.lon,
    }));
  }

  private async searchWithOpenCage(query: string): Promise<AutocompleteResult[]> {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: query,
        key: this.apiKey,
        limit: 10,
        no_annotations: 1,
      },
    });

    return response.data.results.map((result: any) => ({
      name: result.components.city || result.components.town || result.components.village || 'Unknown',
      country: result.components.country,
      state: result.components.state,
      lat: result.geometry.lat,
      lon: result.geometry.lng,
    }));
  }
}

export const geocodingService = new GeocodingService();