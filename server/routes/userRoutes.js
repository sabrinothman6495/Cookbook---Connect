import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js'; // Ensure this path is correct
import { authMiddleware } from '../middleware/authMiddleware.js'; // Ensure this path is correct

const router = express.Router();

// User routes with authMiddleware for protection
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.post('/', authMiddleware, createUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;