import express from 'express';
import asyncHandler from 'express-async-handler';
import { z } from 'zod';
import { optionalAuth } from '../middleware/auth.js';
import { weatherService } from '../services/weatherService.js';
import { geocodingService } from '../services/geocodingService.js';

const router = express.Router();

// Get weather data
const weatherQuerySchema = z.object({
  city: z.string().optional(),
  lat: z.string().optional(),
  lon: z.string().optional(),
}).refine(data => data.city || (data.lat && data.lon), {
  message: "Either city or lat/lon coordinates are required"
});

router.get('/weather', optionalAuth, asyncHandler(async (req, res) => {
  const query = weatherQuerySchema.parse(req.query);
  let lat: number, lon: number;
  
  if (query.city) {
    // Geocode city to coordinates
    const location = await geocodingService.geocodeCity(query.city);
    lat = location.lat;
    lon = location.lon;
  } else {
    lat = parseFloat(query.lat!);
    lon = parseFloat(query.lon!);
  }

  // Get weather data
  const weatherData = await weatherService.getWeatherData(lat, lon, req.user);
  
  res.json(weatherData);
}));

// Autocomplete cities
const autocompleteSchema = z.object({
  query: z.string().min(2).max(100),
});

router.get('/autocomplete', optionalAuth, asyncHandler(async (req, res) => {
  const { query } = autocompleteSchema.parse(req.query);
  
  const suggestions = await geocodingService.searchCities(query);
  
  res.json({ suggestions });
}));

export default router;