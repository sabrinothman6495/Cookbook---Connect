import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../../Cook-Vite');

router.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

export default router;
















