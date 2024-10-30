import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import { hashUtils } from '../utils/hashUtil.js';

export const getAllUsers = async (req, res) => {
  try {
    console.log('Fetching all users'); // Log start of function
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error); // Detailed log
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log('Fetching user by ID:', id); // Log user ID being fetched

  try {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (user) {
      res.json(user);
    } else {
      console.log('User not found'); // Log if user is not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error); // Detailed log
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { avatar, username, name, email } = req.body;
  console.log('Updating profile for user ID:', id); // Log user ID and update details

  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update({ avatar, username, name, email });
      res.json(user);
    } else {
      console.log('User not found for updating profile'); // Log if user is not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error); // Detailed log
    res.status(400).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log('Creating new user with data:', req.body); // Log user data being created
    const { password, ...userData } = req.body;
    const hashedPassword = await hashUtils.hashPassword(password);
    const newUser = await User.create({
      ...userData,
      password: hashedPassword
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error); // Detailed log
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log('Updating user ID:', id); // Log user ID and update details

  try {
    const user = await User.findByPk(id);
    if (user) {
      const { password, ...updateData } = req.body;
      if (password) {
        updateData.password = await hashUtils.hashPassword(password);
      }
      await user.update(updateData);
      res.json(user);
    } else {
      console.log('User not found for updating'); // Log if user is not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error); // Detailed log
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log('Deleting user ID:', id); // Log user ID being deleted

  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      console.log('User not found for deletion'); // Log if user is not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error); // Detailed log
    res.status(500).json({ message: error.message });
  }
};

export const getFavoritedRecipes = async (req, res) => {
  const { id } = req.params;
  console.log('Fetching favorited recipes for user ID:', id); // Log user ID for favorited recipes

  try {
    const user = await User.findByPk(id);
    if (user) {
      const favoritedRecipes = await user.getFavoritedRecipes();
      res.json(favoritedRecipes);
    } else {
      console.log('User not found for favorited recipes'); // Log if user is not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching favorited recipes:', error); // Detailed log
    res.status(500).json({ message: error.message });
  }
};

export const getCreatedRecipes = async (req, res) => {
  const { id } = req.params;
  console.log('Fetching created recipes for user ID:', id); // Log user ID for created recipes

  try {
    const recipes = await Recipe.findAll({ where: { userId: id } });
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching created recipes:', error); // Detailed log
    res.status(500).json({ message: error.message });
  }
};








