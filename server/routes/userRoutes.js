import express from 'express';
import { getAllUsers, addUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
router.post('/', authMiddleware, addUser);

export default router;