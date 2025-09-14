import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { User, SavedLocation } from '@shared/types';

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: userService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (updates: Partial<Pick<User, 'name' | 'units'>>) => 
      userService.updateProfile(updates),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user'], updatedUser);
    },
  });
};

export const useSavedLocations = () => {
  return useQuery<SavedLocation[]>({
    queryKey: ['savedLocations'],
    queryFn: userService.getSavedLocations,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};



export const useAddLocation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (location: Omit<SavedLocation, 'id'>) => 
      userService.addSavedLocation(location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedLocations'] });
    },
  });
};

export const useRemoveLocation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (locationId: string) => 
      userService.removeSavedLocation(locationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedLocations'] });
    },
  });
};