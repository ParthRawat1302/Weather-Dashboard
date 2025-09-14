import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
  CLIENT_ORIGIN: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES: z.string().optional(),
  JWT_REFRESH_EXPIRES: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_CALLBACK_URL: z.string().url(),
  OPENWEATHER_API_KEY: z.string().min(1),
  GEOCODING_PROVIDER: z.enum(['opencage', 'openweather']).optional(),
  GEOCODING_API_KEY: z.string().optional(),
  DATABASE_URL: z.string().min(1),
});

export function validateEnv() {
  try {
    envSchema.parse(process.env);
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    console.error('❌ Environment validation failed:');
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    process.exit(1);
  }
}