import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
    addSalary,
    getSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary,
} from '../controllers/salaryController.js';

const router = express.Router();

router.get('/', authMiddleware, getSalaries);
router.post('/add', authMiddleware, addSalary);
router.get('/:id', authMiddleware, getSalaryById);
router.put('/edit/:id', authMiddleware, updateSalary);
router.delete('/:id', authMiddleware, deleteSalary);

export default router;