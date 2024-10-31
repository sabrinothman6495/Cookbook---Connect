import Recipe from '../models/Recipe.js';
import User from '../models/User.js'; // Ensure this is imported if you need the User model
import { body, validationResult } from 'express-validator';

// Validation middleware for creating/updating users (if needed)
const userValidation = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    // Add any other validation rules as necessary
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll(); // Adjust based on your User model
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async getFavoritedRecipes(req, res) {
        const userId = req.params.id;
        try {
            const userWithFavorites = await User.findByPk(userId, {
                include: [{ model: Recipe, as: 'favorites' }] // Ensure 'favorites' association is defined
            });

            if (!userWithFavorites) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(userWithFavorites.favorites);
        } catch (error) {
            console.error('Error fetching favorited recipes:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async getCreatedRecipes(req, res) {
        const userId = req.params.id;
        try {
            const recipes = await Recipe.findAll({ where: { creatorId: userId } }); // Adjust 'creatorId' based on your schema
            res.status(200).json(recipes);
        } catch (error) {
            console.error('Error fetching created recipes:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async updateProfile(req, res) {
        const userId = req.params.id;
        try {
            const [updated] = await User.update(req.body, {
                where: { id: userId }, // Ensure this matches your User model
                returning: true,
            });
            if (!updated) {
                return res.status(404).json({ message: 'User not found' });
            }
            const updatedUser = await User.findByPk(userId);
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Error updating user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async createUser(req, res) {
        // Implementation for creating a user, with validation
        // Example:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // ... add the logic for user creation
    },

    async updateUser(req, res) {
        // Implementation for updating a user
    },

    async deleteUser(req, res) {
        // Implementation for deleting a user
    },
};

export const createUser = [userValidation, handleValidationErrors, userController.createUser];
export const { getAllUsers, getUserById, updateProfile, updateUser, deleteUser } = userController;










