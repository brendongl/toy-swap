import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes (will be created as we build features)
// import authRoutes from './routes/auth';
// import toyRoutes from './routes/toys';
// import swipeRoutes from './routes/swipes';
// import matchRoutes from './routes/matches';

// Import middleware
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
app.use('/api', (req, res) => {
  res.json({
    message: 'ToySwap API',
    version: '0.1.0',
    endpoints: [
      '/health',
      '/api/auth',
      '/api/toys',
      '/api/swipes',
      '/api/matches',
      '/api/swaps',
      '/api/messages',
    ],
  });
});

// Routes will be added here as they are created
// app.use('/api/auth', authRoutes);
// app.use('/api/toys', toyRoutes);
// app.use('/api/swipes', swipeRoutes);
// app.use('/api/matches', matchRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ToySwap API server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;
