// In your router file (e.g., departmentRoutes.js)

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDepartment, getDepartments, getDepartmentById, updateDepartment } from '../controllers/departmentController.js'; // <-- Import the new controller

const router = express.Router();

router.get('/', authMiddleware, getDepartments);
router.post('/add', authMiddleware, addDepartment);
router.get('/:id', authMiddleware, getDepartmentById);
router.put('/edit/:id', authMiddleware, updateDepartment); // <-- Add this new PUT route

export default router;