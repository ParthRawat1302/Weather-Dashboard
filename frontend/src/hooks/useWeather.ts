import { useQuery } from '@tanstack/react-query';
import { weatherService } from '../services/weatherService';
import { WeatherData, AutocompleteResult } from '@shared/types';

export const useWeather = (city?: string, lat?: number, lon?: number) => {
  return useQuery<WeatherData>({
    queryKey: ['weather', city, lat, lon],
    queryFn: () => weatherService.getWeather(city, lat, lon),
    enabled: !!(city || (lat !== undefined && lon !== undefined)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAutocomplete = (query: string) => {
  return useQuery<AutocompleteResult[]>({
    queryKey: ['autocomplete', query],
    queryFn: () => weatherService.searchCities(query),
    enabled: query.length >= 2,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};