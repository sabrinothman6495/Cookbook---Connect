import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import socialMediaAPI from './api/socialMediaAPI.js'; // Import the new API file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

import { connectDB } from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './utils/errorHandler.js';
import htmlRoutes from './routes/htmlRoutes.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../Cook-Vite/public')));
app.use(express.static(path.join(__dirname, '../Cook-Vite/public'), { extensions: ['js'] })); // Add this line

connectDB();

app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/social', socialMediaAPI); // Use the new router
app.use('/', htmlRoutes);

// Catch-all route for unmatched routes, returning 404
app.get('*', (req, res) => {
  res.status(404).send("Welcome to Cookbook Connect API - Page not found");
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
