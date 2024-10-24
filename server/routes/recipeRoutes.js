const express = require('express');
const recipeController = require('../controllers/recipeController');
const { authMiddleware } = require('../middleware/authMiddleware'); // Ensure protected routes
const router = express.Router();

// Routes for Recipe operations
router.get('/recipes', authMiddleware, recipeController.getAllRecipes);
router.get('/recipes/:id', authMiddleware, recipeController.getRecipeById);
router.post('/recipes', authMiddleware, recipeController.createRecipe);
router.put('/recipes/:id', authMiddleware, recipeController.updateRecipe);
router.delete('/recipes/:id', authMiddleware, recipeController.deleteRecipe);

// Route to get random recipes
router.get('/recipes/random', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3; // Defaults to 3 if limit is not provided
    const recipes = await Recipe.findAll({
      order: sequelize.random(),
      limit: limit,
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching random recipes' });
  }
});

module.exports = router;
