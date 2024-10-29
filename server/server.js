import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
//import helmet from 'helmet';
import cors from 'cors';
//import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//import helmet from 'helmet';
import cors from 'cors';
//import compression from 'compression';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { connectDB } from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './utils/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3002;

//app.use(cors());
//app.use(compression());
app.use(express.json());

// Serve static files with correct MIME types
app.use(express.static(path.join(__dirname, '../Cook-Vite/dist/'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// API routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Catch-all route for SPA
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../Cook-Vite/dist/index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB().catch(console.error);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});











