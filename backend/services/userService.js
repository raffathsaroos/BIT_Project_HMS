import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import userDao from '../dao/userDao.js';
import { USER_ROLES } from '../models/user.js';

const SALT_ROUNDS = 12;

const normalizeEmail = (email) => email.toLowerCase().trim();

const sanitizeUser = (user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }

    return jwt.sign(
        {
            id: user._id.toString(),
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};

const signupUser = async ({ name, email, password, role = 'patient' }) => {
    const normalizedEmail = normalizeEmail(email);

    if (!USER_ROLES.includes(role)) {
        throw new Error(`Invalid role. Allowed roles: ${USER_ROLES.join(', ')}`);
    }

    const existingUser = await userDao.getUserByEmail(normalizedEmail);
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await userDao.createUser({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role,
    });

    const token = generateToken(user);

    return {
        token,
        user: sanitizeUser(user),
    };
};

const loginUser = async ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const user = await userDao.getUserByEmail(normalizedEmail, true);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
        throw new Error('This account is inactive. Please contact an administrator.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user);

    return {
        token,
        user: sanitizeUser(user),
    };
};

const getCurrentUser = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user id');
    }

    const user = await userDao.getUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    return sanitizeUser(user);
};

const userService = {
    signupUser,
    loginUser,
    getCurrentUser,
};

export default userService;