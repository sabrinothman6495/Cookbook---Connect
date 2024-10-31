'use strict';

import { User, Recipe } from '../models/index.js'; // Adjust the path based on your actual structure

export async function up(queryInterface, Sequelize) {
  await User.bulkCreate([
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      bio: 'I love cooking and sharing recipes!',
      profilePicture: '',
    },
    {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'password123',
      bio: 'Food enthusiast!',
      profilePicture: '',
    },
    {
      username: 'chef_boyardee',
      email: 'chef@example.com',
      password: 'password123',
      bio: 'Master of pasta dishes!',
      profilePicture: '',
    }
  ]);

  await Recipe.bulkCreate([
    {
      recipeName: 'Spaghetti Bolognese',
      ingredients: 'Spaghetti, minced meat, tomatoes, onion, garlic, olive oil, herbs',
      cookingTime: '30 minutes',
      instructions: 'Cook spaghetti. In a separate pan, cook minced meat and add other ingredients.',
      difficulty: 'easy',
      servingSize: 4,
      image: '',
      creatorId: 'john_doe', // Assuming you are associating with users based on the above
    },
    {
      recipeName: 'Chicken Curry',
      ingredients: 'Chicken, curry paste, coconut milk, vegetables',
      cookingTime: '45 minutes',
      instructions: 'Fry chicken, add curry paste, and stir in coconut milk.',
      difficulty: 'medium',
      servingSize: 4,
      image: '',
      creatorId: 'jane_smith', // Similarly associate
    },
    {
      recipeName: 'Chocolate Cake',
      ingredients: 'Flour, sugar, cocoa powder, eggs, butter',
      cookingTime: '60 minutes',
      instructions: 'Mix ingredients and bake in a preheated oven.',
      difficulty: 'hard',
      servingSize: 8,
      image: '',
      creatorId: 'chef_boyardee', // Similarly associate
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await Recipe.destroy({ where: {}, truncate: true, cascade: true });
  await User.destroy({ where: {}, truncate: true, cascade: true });
}


