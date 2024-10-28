import express from 'express';
import {
  getAllUsers, getUserById, createUser, updateUser, deleteUser,
  getFavoritedRecipes, getCreatedRecipes, updateProfile
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes with authMiddleware for protection
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.get('/:id/favorites', authMiddleware, getFavoritedRecipes);
router.get('/:id/created', authMiddleware, getCreatedRecipes);
router.put('/:id/profile', authMiddleware, updateProfile); // Add this for profile updates
router.post('/', authMiddleware, createUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;

