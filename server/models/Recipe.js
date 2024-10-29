import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Recipe = sequelize.define('Recipe', {
  recipeID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  recipeName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100],
      notEmpty: true,
    }
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  cookingTime: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
    defaultValue: 'medium',
  },
  servingSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 50,
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  }
}, {
  tableName: 'recipes',
  timestamps: true,
  indexes: [
    { fields: ['recipeName'] },
    { fields: ['difficulty'] }
  ]
});

const RecipeManager = {
  async initialize() {
    await sequelize.sync();
  },

  async seed() {
    const recipes = [
      {
        recipeName: 'Spaghetti Bolognese',
        ingredients: 'Spaghetti, minced meat, tomatoes, onion, garlic, olive oil, herbs',
        cookingTime: '30 minutes',
        instructions: 'Cook spaghetti. In a separate pan, cook minced meat and add other ingredients.',
        difficulty: 'easy',
        servingSize: 4,
        image: 'spaghetti.jpg',
      },
      // ... other recipes
    ];

    await Recipe.bulkCreate(recipes);
  }
};

export { Recipe as default, RecipeManager };


