import User from '../models/User.js'; // Update the path if necessary
import Recipe from '../models/Recipe.js'; // Update the path if necessary

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.destroy({ where: {}, truncate: true, cascade: true });
    await Recipe.destroy({ where: {}, truncate: true, cascade: true });

    // Create new users
    const users = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
        bio: 'I love cooking and sharing recipes!',
        profilePicture: 'default-avatar.png',
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'password456',
        bio: 'Baking is my passion!',
        profilePicture: 'default-avatar.png',
      },
      {
        username: 'bob_baker',
        email: 'bob@example.com',
        password: 'password789',
        bio: 'Always experimenting in the kitchen.',
        profilePicture: 'default-avatar.png',
      },
    ];
    await User.bulkCreate(users);

    // Create new recipes
    const recipes = [
      {
        recipeName: 'Spaghetti Bolognese',
        ingredients: 'Spaghetti, minced meat, tomatoes, onion, garlic, olive oil, herbs',
        cookingTime: '30 minutes',
        instructions: 'Cook spaghetti. In a separate pan, cook minced meat and add other ingredients.',
        difficulty: 'easy',
        servingSize: 4,
        image: 'spaghetti-bolognese.jpg',
      },
      {
        recipeName: 'Chocolate Cake',
        ingredients: 'Flour, sugar, cocoa powder, eggs, butter, baking powder, milk',
        cookingTime: '1 hour',
        instructions: 'Mix ingredients, bake at 350°F for 30-35 minutes.',
        difficulty: 'medium',
        servingSize: 8,
        image: 'chocolate-cake.jpg',
      },
      {
        recipeName: 'Caesar Salad',
        ingredients: 'Romaine lettuce, croutons, Parmesan cheese, Caesar dressing',
        cookingTime: '15 minutes',
        instructions: 'Combine ingredients and toss with dressing.',
        difficulty: 'easy',
        servingSize: 2,
        image: 'caesar-salad.jpg',
      },
    ];
    await Recipe.bulkCreate(recipes);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export default seedDatabase;
