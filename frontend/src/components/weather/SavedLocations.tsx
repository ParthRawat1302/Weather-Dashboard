import React from 'react';
import { MapPin, Star, Trash2, Plus } from 'lucide-react';
import { SavedLocation } from '@shared/types';
import { useSavedLocations, useRemoveLocation } from '../../hooks/useUser';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

interface SavedLocationsProps {
  onLocationSelect: (location: SavedLocation) => void;
  onAddLocation?: () => void;
}

const SavedLocations: React.FC<SavedLocationsProps> = ({ 
  onLocationSelect, 
  onAddLocation 
}) => {
  const { actualTheme } = useTheme();
  const { data: locations = [], isLoading } = useSavedLocations();
  const removeLocationMutation = useRemoveLocation();

  const handleRemoveLocation = (e: React.MouseEvent, locationId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this location?')) {
      removeLocationMutation.mutate(locationId);
    }
  };

  if (isLoading) {
    return (
      <div className={`${
        actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
      } animate-pulse`}>
        <div className="h-6 bg-white/20 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-white/10 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${
      actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
    } animate-slide-up`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Saved Locations
        </h3>
        {onAddLocation && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddLocation}
            className="p-2"
            title="Add current location"
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      {locations.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No saved locations yet
          </p>
          {onAddLocation && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onAddLocation}
            >
              Add Location
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => onLocationSelect(location)}
              className="w-full flex items-center justify-between p-4 bg-white/10 dark:bg-black/10 rounded-xl hover:bg-white/20 dark:hover:bg-black/20 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                {location.isDefault ? (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                ) : (
                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {location.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <button
                onClick={(e) => handleRemoveLocation(e, location.id)}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg transition-all"
                title="Remove location"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLocations;