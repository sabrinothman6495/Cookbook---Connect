import express from 'express';
import { json } from 'express';
import pkg from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { compare } = pkg;

const app = express();
app.use(json()); // Middleware to parse JSON

const users = [
  { id: 1, username: 'user1', password: '$2a$10$abcdefg' }, // Example hashed password
];

// JWT Secret
const secret = process.env.JWT_SECRET || 'your-secret-key';

// Login route (POST /login)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user (simulating a database lookup)
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare the password with the stored hashed password
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create JWT payload
  const payload = {
    user: {
      id: user.id,
      username: user.username,
    },
  };

  // Sign token and return it
  jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
});

// Middleware to protect routes
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Access denied. Invalid token.' });
  }
};

app.listen(3001, () => {
  console.log('Auth server running on port 3001');
});
