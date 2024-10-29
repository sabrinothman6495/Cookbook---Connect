import Recipe from '../models/Recipe.js';
import { body, validationResult } from 'express-validator';

const recipeValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('ingredients').notEmpty().withMessage('Ingredients are required'),
  body('cookingTime').notEmpty().withMessage('Cooking time is required'),
  body('instructions').notEmpty().withMessage('Instructions are required'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level'),
  body('servingSize').isInt({ min: 1 }).withMessage('Invalid serving size')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const recipeController = {
  async createRecipe(req, res) {
    try {
      const newRecipe = await Recipe.create(req.body);
      res.status(201).json({ success: true, data: newRecipe });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  async getAllRecipes(req, res) {
    try {
      const { page = 1, limit = 10, sort = 'createdAt' } = req.query;
      const recipes = await Recipe.findAndCountAll({
        limit: parseInt(limit),
        offset: (page - 1) * limit,
        order: [[sort, 'DESC']]
      });
      res.status(200).json({
        success: true,
        data: recipes.rows,
        total: recipes.count,
        pages: Math.ceil(recipes.count / limit)
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getRecipeById(req, res) {
    try {
      const recipe = await Recipe.findByPk(req.params.id);
      if (!recipe) {
        return res.status(404).json({ success: false, error: 'Recipe not found' });
      }
      res.status(200).json({ success: true, data: recipe });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async updateRecipe(req, res) {
    try {
      const [updated] = await Recipe.update(req.body, {
        where: { recipeID: req.params.id },
        returning: true
      });
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Recipe not found' });
      }
      const updatedRecipe = await Recipe.findByPk(req.params.id);
      res.status(200).json({ success: true, data: updatedRecipe });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  async deleteRecipe(req, res) {
    try {
      const deleted = await Recipe.destroy({
        where: { recipeID: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Recipe not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

export const createRecipe = [recipeValidation, handleValidationErrors, recipeController.createRecipe];
export const { getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } = recipeController;
