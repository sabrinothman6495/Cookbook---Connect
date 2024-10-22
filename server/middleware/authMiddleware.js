import express, { json } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs'; // For hashing passwords
require('dotenv').config();

const app = express();
app.use(json()); // Middleware to parse JSON

const users = [
    { id: 1, username: 'user1', password: '$2a$10$abcdefg' }, // Password is hashed
];

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
    sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }, // Token expires in 1 hour
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
    );
});

app.listen(3001, () => {
    console.log('Auth server running on port 3001');
});
