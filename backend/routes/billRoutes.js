import express from 'express';
import {
    createBill,
    deleteBill,
    getBillById,
    getBills,
    updateBill,
} from '../controllers/billController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('admin'));

router
    .route('/')
    .get(getBills)
    .post(createBill);

router
    .route('/:id')
    .get(getBillById)
    .patch(updateBill)
    .delete(deleteBill);

export default router;
