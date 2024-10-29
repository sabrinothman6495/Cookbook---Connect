import express from 'express';
import * as recipeController from '../controllers/recipeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/random', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 3, 10);
    const recipes = await recipeController.getAllRecipes();
    const randomRecipes = recipes
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
    res.status(200).json(randomRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random recipes' });
  }
});

const routes = [
  { path: '/', method: 'get', handler: recipeController.getAllRecipes },
  { path: '/:id', method: 'get', handler: recipeController.getRecipeById },
  { path: '/', method: 'post', handler: recipeController.createRecipe },
  { path: '/:id', method: 'put', handler: recipeController.updateRecipe },
  { path: '/:id', method: 'delete', handler: recipeController.deleteRecipe }
];

routes.forEach(route => {
  router[route.method](route.path, authMiddleware, route.handler);
});

export default router;


