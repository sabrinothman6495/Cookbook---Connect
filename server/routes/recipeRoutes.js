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

module.exports
