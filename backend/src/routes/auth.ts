import express from 'express';
import passport from 'passport';
import asyncHandler from 'express-async-handler';
import { z } from 'zod';
import { tokenService } from '../services/tokenService.js';
import { createError } from '../middleware/errorHandler.js';
import { User } from '@shared/types';

const router = express.Router();

// Google OAuth initiation
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  asyncHandler(async (req, res) => {

    console.log("✅ Google callback hit");

    const user = req.user as User;
    
    if (!user) {
      return res.redirect(`${process.env.CLIENT_ORIGIN}/#/auth/error`);
    }

    // Generate tokens
    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend with access token
    res.redirect(`${process.env.CLIENT_ORIGIN}?#/auth/success?token=${accessToken}`);
  })
);

// Refresh token endpoint
const refreshSchema = z.object({
  refreshToken: z.string().optional(),
});

router.post('/refresh', asyncHandler(async (req, res) => {
  const { refreshToken: bodyToken } = refreshSchema.parse(req.body);
  const cookieToken = req.cookies.refreshToken;
  
  const refreshToken = bodyToken || cookieToken;
  
  if (!refreshToken) {
    throw createError('Refresh token required', 401, 'NO_REFRESH_TOKEN');
  }

  try {
    const payload = tokenService.verifyRefreshToken(refreshToken);
    
    // Get fresh user data
    const { prisma } = await import('../config/database.js');
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

    // Generate new access token
    const newAccessToken = tokenService.generateAccessToken(mappedUser);
    
    res.json({
      accessToken: newAccessToken,
      user: mappedUser,
    });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'name' in error) {
      const err = error as { name: string };
      if (err.name === 'TokenExpiredError') {
        throw createError('Refresh token expired', 401, 'REFRESH_TOKEN_EXPIRED');
      }
      if (err.name === 'JsonWebTokenError') {
        throw createError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
      }
    }
    throw error;
  }
}));

// Logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

export default router;
