const { Recipe } = require('../models'); // Corrected path to models directory
const { body, validationResult } = require('express-validator');

// Create a new recipe
const createRecipe = [
  body('name').notEmpty().withMessage('Name is required'),
  body('ingredients').notEmpty().withMessage('Ingredients are required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newRecipe = await Recipe.create(req.body);
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const [updated] = await Recipe.update(req.body, {
      where: { id: req.params.id }, // Changed recipeID to id for consistency
    });
    if (updated) {
      const updatedRecipe = await Recipe.findByPk(req.params.id);
      res.status(200).json(updatedRecipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.destroy({
      where: { id: req.params.id }, // Changed recipeID to id for consistency
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
