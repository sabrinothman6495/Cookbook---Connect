import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './utils/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3002;

// Enable CORS
app.use(cors());
app.use(express.json());

// Define path to Vite build output
const distPath = path.join(__dirname, '../Cook-Vite/dist');

// Check if the `dist` directory exists (for debugging purposes)
if (!distPath) {
  console.error(`Dist path does not exist at: ${distPath}`);
}

// Serve static files with correct MIME types
app.use(
  express.static(distPath, {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  })
);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Catch-all route for SPA (React Router)
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send('An error occurred while loading the application');
    }
  });
});

// Error handler middleware
app.use(errorHandler);

// Start server and connect to database
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB().catch(console.error);
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
