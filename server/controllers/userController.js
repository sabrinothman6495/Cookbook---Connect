import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import { hashUtils } from '../utils/hashUtil.js';

// Function to validate user data
const validateUserData = (data) => {
  const { email, username } = data;
  const errors = [];
  
  if (!email.includes('@')) {
    errors.push('Invalid email format');
  }
  if (!username || username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  
  return errors;
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { avatar, username, name, email } = req.body;
  console.log('Updating profile for user ID:', id); // Log user ID and update details

  console.log('Updating profile for user ID:', id);

  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update({ avatar, username, name, email });
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;

    // Validate user data
    const errors = validateUserData(userData);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const hashedPassword = await hashUtils.hashPassword(password);
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      const { password, ...updateData } = req.body;
      if (password) {
        updateData.password = await hashUtils.hashPassword(password);
      }

      // Validate user data
      const errors = validateUserData(updateData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      await user.update(updateData);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavoritedRecipes = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      const favoritedRecipes = await user.getFavoritedRecipes();
      res.json(favoritedRecipes);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCreatedRecipes = async (req, res) => {
  const { id } = req.params;
  try {
    const recipes = await Recipe.findAll({ where: { userId: id } });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





