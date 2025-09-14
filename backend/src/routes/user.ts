import express from 'express';
import asyncHandler from 'express-async-handler';
import { z } from 'zod';
import { authGuard } from '../middleware/auth.js';
import { prisma } from '../config/database.js';
import { createError } from '../middleware/errorHandler.js';
import { User } from '@shared/types';

const router = express.Router();

// Get current user
router.get('/me', authGuard, asyncHandler(async (req, res) => {
  res.json({ user: req.user });
}));

// Update user profile
const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  tempUnit: z.enum(['C', 'F']).optional(),
  windUnit: z.enum(['kph', 'mph']).optional(),
});

router.put('/me', authGuard, asyncHandler(async (req, res) => {
  const updates = updateUserSchema.parse(req.body);
  
  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      ...updates.name && { name: updates.name },
      ...updates.tempUnit && { tempUnit: updates.tempUnit },
      ...updates.windUnit && { windUnit: updates.windUnit },
    },
  });

  const mappedUser: User = {
    id: user.id,
    googleId: user.googleId,
    email: user.email,
    name: user.name,
    photoUrl: user.photoUrl,
    units: {
      tempUnit: user.tempUnit as 'C' | 'F',
      windUnit: user.windUnit as 'kph' | 'mph',
    },
    savedLocations: Array.isArray(user.savedLocations) 
      ? user.savedLocations as any[] 
      : [],
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };

  res.json({ user: mappedUser });
}));

// Get saved locations
router.get('/locations', authGuard, asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { savedLocations: true },
  });

  const locations = Array.isArray(user?.savedLocations) 
    ? user.savedLocations as any[] 
    : [];

  res.json({ locations });
}));

// Add saved location
const addLocationSchema = z.object({
  name: z.string().min(1),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  isDefault: z.boolean().optional(),
});

router.post('/locations', authGuard, asyncHandler(async (req, res) => {
  const locationData = addLocationSchema.parse(req.body);
  
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { savedLocations: true },
  });

  let locations = Array.isArray(user?.savedLocations) 
    ? user.savedLocations as any[] 
    : [];

  // If this is set as default, remove default from others
  if (locationData.isDefault) {
    locations = locations.map(loc => ({ ...loc, isDefault: false }));
  }

  // Add new location with unique ID
  const newLocation = {
    id: `loc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...locationData,
  };

  locations.push(newLocation);

  await prisma.user.update({
    where: { id: req.user!.id },
    data: { savedLocations: locations },
  });

  res.status(201).json({ location: newLocation });
}));

// Remove saved location
router.delete('/locations/:id', authGuard, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { savedLocations: true },
  });

  let locations = Array.isArray(user?.savedLocations) 
    ? user.savedLocations as any[] 
    : [];

  const locationExists = locations.some((loc: any) => loc.id === id);
  
  if (!locationExists) {
    throw createError('Location not found', 404, 'LOCATION_NOT_FOUND');
  }

  locations = locations.filter((loc: any) => loc.id !== id);

  await prisma.user.update({
    where: { id: req.user!.id },
    data: { savedLocations: locations },
  });

  res.json({ message: 'Location removed successfully' });
}));

export default router;