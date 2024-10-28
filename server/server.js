import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

import { connectDB } from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './utils/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

connectDB();

app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.get("*",(req,res)=>{
  res.send("Welcome to Cookbook Connect API");
  req.status(200);
})


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
