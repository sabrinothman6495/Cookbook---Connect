import { Sequelize, DataTypes } from 'sequelize';
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
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cookingTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
  },
  servingSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'recipes',
});

async function initializeDatabase() {
  await sequelize.sync();
}

async function seedDatabase() {
  const recipes = [
    {
      recipeName: 'Spaghetti Bolognese',
      ingredients: 'Spaghetti, minced meat, tomatoes, onion, garlic, olive oil, herbs',
      cookingTime: '30 minutes',
      instructions: 'Cook spaghetti. In a separate pan, cook minced meat and add other ingredients.',
      difficulty: 'easy',
      servingSize: 4,
      Image: 'spaghetti.jpg',
    },
    {
      recipeName: 'Pizza',
      ingredients: 'Flour, yeast, water, tomato sauce, cheese, toppings',
      cookingTime: '60 minutes',
      instructions: 'Mix flour, yeast, and water to make dough. Add tomato sauce, cheese, and toppings.',
      difficulty: 'hard',
      servingSize: 4,
      Image: 'pizza.jpg',
    },
    {
      recipeName: 'Pancakes',
      ingredients: 'Flour, milk, eggs, sugar, butter',
      cookingTime: '20 minutes',
      instructions: 'Mix flour, milk, eggs, and sugar to make batter. Cook in a pan with butter.',
      difficulty: 'easy',
      servingSize: 4,
      Image: 'pancakes.jpg',
    },
    {
      recipeName: 'Chocolate Cake',
      ingredients: 'Flour, sugar, cocoa powder, eggs, butter, milk',
      cookingTime: '45 minutes',
      instructions: 'Mix flour, sugar, cocoa powder, eggs, butter, and milk. Bake in oven.',
      difficulty: 'medium',
      servingSize: 8,
      Image: 'chocolate-cake.jpg',
    },
    {
      recipeName: 'Chicken Curry',
      ingredients: 'Chicken, curry paste, coconut milk, onion, garlic, ginger',
      cookingTime: '45 minutes',
      instructions: 'Cook chicken with curry paste, coconut milk, onion, garlic, and ginger.',
      difficulty: 'medium',
      servingSize: 4,
      Image: 'chicken-curry.jpg',
    },
  ];
  await Recipe.bulkCreate(recipes);
}

async function main() {
  await initializeDatabase();
  await seedDatabase();
  console.log('Database initialized and seeded with dummy data.');
}

main().catch(console.error);

export default Recipe;
