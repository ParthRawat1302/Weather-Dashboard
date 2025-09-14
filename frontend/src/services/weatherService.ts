import axios from 'axios';
import { WeatherData, AutocompleteResult } from '@shared/types';

const API_BASE_URL =import.meta.env.VITE_API_URL;

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.config && !error.config._retry) {
      error.config._retry = true;
      
      try {
        const refreshResponse = await axios.post(`/auth/refresh`, {}, {
          withCredentials: true,
        });
        
        const { accessToken } = refreshResponse.data;
        localStorage.setItem('accessToken', accessToken);
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        
        return api.request(error.config);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.dispatchEvent(new CustomEvent('authError'));
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

class WeatherService {
  async getWeather(city?: string, lat?: number, lon?: number): Promise<WeatherData> {
    const params: any = {};
    
    if (city) {
      params.city = city;
    } else if (lat !== undefined && lon !== undefined) {
      params.lat = lat.toString();
      params.lon = lon.toString();
    } else {
      throw new Error('Either city or coordinates must be provided');
    }
    const response = await api.get(`/api/weather`, { params });
    console.log("Weather response:", response.data);
    return response.data;
  }

  async searchCities(query: string): Promise<AutocompleteResult[]> {
    if (query.length < 2) return [];

    const response = await api.get(`/api/autocomplete`, {
      params: { query },
    });
    
    return response.data.suggestions || [];
  }
}

export const weatherService = new WeatherService();