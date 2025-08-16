import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
    addLeaveApplication,
    getLeaveApplications,
    getLeaveApplicationById,
    updateLeaveApplication,
    deleteLeaveApplication,
} from '../controllers/leaveController.js';

const router = express.Router();

router.get('/', authMiddleware, getLeaveApplications);
router.post('/add', authMiddleware, addLeaveApplication);
router.get('/:id', authMiddleware, getLeaveApplicationById);
router.put('/edit/:id', authMiddleware, updateLeaveApplication);
router.delete('/:id', authMiddleware, deleteLeaveApplication);

export default router;