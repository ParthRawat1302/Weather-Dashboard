import axios from 'axios';
import { User, SavedLocation } from '@shared/types';

const API_BASE_URL =import.meta.env.VITE_API_URL+'/api';



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

class UserService {
  async getProfile(): Promise<User> {
    const response = await api.get(`${API_BASE_URL}/user/me`);
    return response.data.user;
  }

  async updateProfile(updates: Partial<Pick<User, 'name' | 'units'>>): Promise<User> {
    const payload: any = {};
    
    if (updates.name) {
      payload.name = updates.name;
    }
    
    if (updates.units) {
      payload.tempUnit = updates.units.tempUnit;
      payload.windUnit = updates.units.windUnit;
    }

    const response = await api.put(`${API_BASE_URL}/user/me`, payload);
    return response.data.user;
  }

  async getSavedLocations(): Promise<SavedLocation[]> {
    console.log("Fetching saved locations from:", `${API_BASE_URL}/user/locations`);
    const response = await api.get(`${API_BASE_URL}/user/locations`);
    return response.data?.locations ?? [];
  }

  async addSavedLocation(location: Omit<SavedLocation, 'id'>): Promise<SavedLocation> {
    const response = await api.post(`${API_BASE_URL}/user/locations`, location);
    console.log("Saved location added:", response);
    return response.data.location;
  }

  async removeSavedLocation(locationId: string): Promise<void> {
    await api.delete(`${API_BASE_URL}/user/locations/${locationId}`);
  }
}

export const userService = new UserService();