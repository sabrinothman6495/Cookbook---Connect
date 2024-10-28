import express from 'express';
import path from 'path';
const router = express.Router();
const __dirname = path.resolve();

// Correctly resolve path
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Cook-Vite', 'public', 'index.html'));
});

export default router;

