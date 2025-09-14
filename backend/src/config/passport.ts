import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from './database.js';
import { User } from '@shared/types';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("✅ Google OAuth success, profile:", profile);
      try {
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails![0].value,
              name: profile.displayName || 'User',
              photoUrl: profile.photos![0].value || '',
              tempUnit: 'C',
              windUnit: 'kph',
              savedLocations: [],
            },
          });
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

        return done(null, mappedUser);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
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
      done(null, mappedUser);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
});

export default passport;