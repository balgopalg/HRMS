// In your router file (e.g., employeeRoutes.js)

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} from '../controllers/EmployeeController.js';

const router = express.Router();

router.get('/', authMiddleware, getEmployees);
router.post('/add', authMiddleware, addEmployee);
router.get('/:id', authMiddleware, getEmployeeById);
router.put('/edit/:id', authMiddleware, updateEmployee);
router.delete('/:id', authMiddleware, deleteEmployee);

export default router;