import express from 'express';
import {
  getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe
} from '../controllers/recipeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/random', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const recipes = await getAllRecipes(); // Call function to fetch all recipes
    const randomRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, limit);
    res.status(200).json(randomRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching random recipes' });
  }
});

router.get('/', authMiddleware, getAllRecipes);
router.get('/:id', authMiddleware, getRecipeById);
router.post('/', authMiddleware, createRecipe);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);

export default router;

