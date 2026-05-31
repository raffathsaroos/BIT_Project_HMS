import express from 'express';

import {

    createPatient,

    deletePatient,

    getPatientById,

    getPatients,

    updatePatient,

} from '../controllers/patientController.js';

import { protect } from '../middleware/authMiddleware.js';

import { authorizeRoles } from '../middleware/roleMiddleware.js';



const router = express.Router();



router.use(protect);



router

    .route('/')

    .get(authorizeRoles('admin', 'doctor', 'nurse'), getPatients)

    .post(authorizeRoles('admin'), createPatient);



router

    .route('/:id')

    .get(authorizeRoles('admin', 'doctor', 'nurse'), getPatientById)

    .patch(authorizeRoles('admin', 'nurse'), updatePatient)

    .delete(authorizeRoles('admin'), deletePatient);



export default router;
