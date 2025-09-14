import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { tokenService } from '../services/tokenService.js';
import { prisma } from '../config/database.js';
import { createError } from './errorHandler.js';
import { User } from '@shared/types';

export const authGuard = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError('Access token required', 401, 'NO_TOKEN');
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const payload = tokenService.verifyAccessToken(token);
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw createError('User not found', 404, 'USER_NOT_FOUND');
    }

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

    req.user = mappedUser;
    next();
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'name' in error) {
      if ((error as { name: string }).name === 'TokenExpiredError') {
        throw createError('Access token expired', 401, 'TOKEN_EXPIRED');
      }
      if ((error as { name: string }).name === 'JsonWebTokenError') {
        throw createError('Invalid access token', 401, 'INVALID_TOKEN');
      }
    }
    throw error;
  }
});

export const optionalAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const payload = tokenService.verifyAccessToken(token);
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (user) {
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

      req.user = mappedUser;
    }
  } catch (error) {
    // Silently fail for optional auth
    console.warn('Optional auth failed:', (error instanceof Error ? error.message : String(error)));
  }
  
  next();
});