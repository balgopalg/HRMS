// src/routes/authRoutes.js
import express from 'express';
import { login, verify } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Corrected typo

const router = express.Router();

router.post('/login', login);
router.get('/verify', authMiddleware, verify); // Corrected usage

export default router;