import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js'; // Import the User model

dotenv.config();
const secret = process.env.JWT_SECRET || 'your-secret-key';

export const authController = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Find the user using the User model
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id,
          username: user.username,
        },
      };

      jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: payload.user });
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};


