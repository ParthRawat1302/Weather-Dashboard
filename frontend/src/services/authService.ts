import axios from 'axios';
import { AuthResponse } from '@shared/types';

const API_BASE_URL =import.meta.env.VITE_API_URL +'/api/auth/';

class AuthService {
  async refreshToken(): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}refresh`, {}, {
      withCredentials: true,
    });
    return response.data;
  }

  async logout(): Promise<void> {
    await axios.post(`${API_BASE_URL}logout`, {}, {
      withCredentials: true,
    });
  }
}

export const authService = new AuthService();