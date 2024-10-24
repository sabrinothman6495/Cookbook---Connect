import express from 'express';
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from '../controllers/recipeController.js'; // Correct imports
import { authMiddleware } from '../middleware/authMiddleware.js'; // Ensure this path is correct

const router = express.Router();

router.get('/', authMiddleware, getAllRecipes);
router.get('/:id', authMiddleware, getRecipeById);
router.post('/', authMiddleware, createRecipe);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);

// Route to get random recipes
router.get('/random', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const recipes = await recipeController.getAllRecipes(); // Adjust if needed
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching random recipes' });
  }
});

export default router;
