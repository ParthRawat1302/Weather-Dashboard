import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';


console.log("✅ Backend starting...");
import { connectDatabase } from './config/database.js';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import weatherRoutes from './routes/weather.js';
import { errorHandler } from './middleware/errorHandler.js';
import { validateEnv } from './utils/validateEnv.js';


// Validate environment variables
validateEnv();
const app = express();
// Tell Express it is behind a trusted proxy (Render)
app.set('trust proxy', 1);

const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Specific rate limiting for weather and search endpoints
const weatherLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60 // limit each IP to 60 requests per minute
});
app.use('/api/weather', weatherLimiter);
app.use('/api/autocomplete', weatherLimiter);



// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });

});// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_ORIGIN_1,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));



// API routes
app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/', weatherRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.send('Backend is running 🚀');
});

// Start server
async function startServer() {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔒 CORS origin: ${process.env.CLIENT_ORIGIN}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('📱 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('📱 SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();
