import express from 'express';
import { loginUser, signupUser } from '../controllers/userController.js';

const router1 = express.Router();

router1.post('/login', loginUser );
router1.post('/signup', signupUser );

export default router1;

