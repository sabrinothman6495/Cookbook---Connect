import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

// to get all users
export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to get favorited recipes for a user
export const getFavoritedRecipes = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      const favoritedRecipes = await user.getFavoritedRecipes(); // Ensure this association exists
      res.json(favoritedRecipes);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to get created recipes for a user
export const getCreatedRecipes = async (req, res) => {
  const { id } = req.params;
  try {
    const recipes = await Recipe.findAll({ where: { userId: id } }); // Ensure this association exists
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to update user profile
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { avatar, username, name, email } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.avatar = avatar;
      user.username = username;
      user.name = name;
      user.email = email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// to create a user
export const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// to update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// to delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

