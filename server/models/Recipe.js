const { title } = require('process');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:'); 

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
}, {
  tableName: 'recipes', 
});
async function initializeDatabase() {
  await sequelize.sync();
}
async function seedDatabase() {
  const recipes = [
    {
      title: 'Spaghetti Bolognese',
      ingredients: 'Spaghetti, minced meat, tomatoes, onion, garlic, olive oil, herbs',
      time: '30 minutes',
      instructions: 'Cook spaghetti. In a separate pan, cook minced meat and add other ingredients.',
      difficulty: 'easy',
      servings: 4,
      Image: 'spaghetti.jpg',
    
    },
    {
        title: 'pizza',
        ingredients: 'flour, yeast, water, tomato sauce, cheese, toppings',
        time: '60 minutes',
        instructions: 'Mix flour, yeast, and water to make dough. Add tomato sauce, cheese, and toppings.',
        difficulty: 'difficult',
        servings: 4,
        Image: 'pizza.jpg',
    },
    {
        title: 'pancakes',
        ingredients: 'flour, milk, eggs, sugar, butter',
        time: '20 minutes',
        instructions: 'Mix flour, milk, eggs, and sugar to make batter. Cook in a pan with butter.',
        difficulty: 'easy',
        servings: 4,
        Image: 'pancakes.jpg',
    },
    {
        title: 'chocolate cake',
        ingredients: 'flour, sugar, cocoa powder, eggs, butter, milk',
        time: '45 minutes',
        instructions: 'Mix flour, sugar, cocoa powder, eggs, butter, and milk. Bake in oven.',
        difficulty: 'medium',
        servings: 8,
        Image: 'chocolate-cake.jpg',
    },
    {
        title: 'chicken curry',
        ingredients: 'chicken, curry paste, coconut milk, onion, garlic, ginger',
        time: '45 minutes',
        instructions: 'Cook chicken with curry paste, coconut milk, onion, garlic, and ginger.',
        difficulty: 'medium',
        servings: 4,
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
