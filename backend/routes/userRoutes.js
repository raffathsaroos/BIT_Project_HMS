import express from 'express';
import { createUserByAdmin } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/admin/create-user', protect, authorizeRoles('admin'), createUserByAdmin);

export default router;
