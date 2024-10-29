import express from 'express';
import * as userController from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.get('/:id/favorites', authMiddleware, userController.getFavoritedRecipes);
router.get('/:id/created', authMiddleware, userController.getCreatedRecipes);
router.put('/:id/profile', authMiddleware, userController.updateProfile);
router.post('/', authMiddleware, userController.createUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

export default router;



