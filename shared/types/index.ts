export interface User {
  id: string;
  googleId: string;
  email: string;
  name: string;
  photoUrl: string;
  units: UserUnits;
  savedLocations: SavedLocation[];
  createdAt: string;
  updatedAt: string;
}

export interface UserUnits {
  tempUnit: 'C' | 'F';
  windUnit: 'kph' | 'mph';
}

export interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  isDefault?: boolean;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  aqi?: AirQuality;
  location: LocationInfo;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  lastUpdated: string;
}

export interface HourlyWeather {
  time: string;
  temp: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

export interface DailyWeather {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  description: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface AirQuality {
  aqi: number;
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
}

export interface LocationInfo {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface AutocompleteResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}