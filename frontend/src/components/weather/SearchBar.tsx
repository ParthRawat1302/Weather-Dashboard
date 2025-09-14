import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useAutocomplete } from '../../hooks/useWeather';
import { AutocompleteResult } from '@shared/types';

interface SearchBarProps {
  onLocationSelect: (location: AutocompleteResult) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onLocationSelect,
  placeholder = "Search for a city...",
  className = "",
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: suggestions = [], isLoading } = useAutocomplete(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setIsOpen(value.length >= 2);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleLocationSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleLocationSelect = (location: AutocompleteResult) => {
    setQuery(`${location.name}, ${location.country}`);
    setIsOpen(false);
    setSelectedIndex(-1);
    onLocationSelect(location);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none  focus:border-transparent transition-all duration-200 text-lg"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl z-50 max-h-80 overflow-y-auto"
        >
          {suggestions.map((location, index) => (
            <button
              key={`${location.lat}-${location.lon}`}
              onClick={() => handleLocationSelect(location)}
              className={`w-full px-4 py-3 text-left hover:bg-white/20 dark:hover:bg-gray-700/20 transition-colors flex items-center space-x-3 ${
                index === selectedIndex ? 'bg-white/20 dark:bg-gray-700/20' : ''
              } ${index === 0 ? 'rounded-t-2xl' : ''} ${
                index === suggestions.length - 1 ? 'rounded-b-2xl' : ''
              }`}
            >
              <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-gray-900 dark:text-white font-medium truncate">
                  {location.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {location.state ? `${location.state}, ` : ''}{location.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;