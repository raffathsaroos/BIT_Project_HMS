import userService from '../services/userService.js';
import { USER_ROLES } from '../models/user.js';

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const sendError = (res, statusCode, message) => res.status(statusCode).json({
    success: false,
    message,
});

export const signupUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return sendError(res, 400, 'Name, email, and password are required');
        }

        if (!isValidEmail(email)) {
            return sendError(res, 400, 'Please provide a valid email address');
        }

        if (password.length < 8) {
            return sendError(res, 400, 'Password must be at least 8 characters long');
        }

        if (role && !USER_ROLES.includes(role)) {
            return sendError(res, 400, `Invalid role. Allowed roles: ${USER_ROLES.join(', ')}`);
        }

        const result = await userService.signupUser({ name, email, password, role });

        return res.status(201).json({
            success: true,
            message: 'Signup successful',
            token: result.token,
            user: result.user,
        });
    } catch (error) {
        const statusCode = error.message.includes('already exists') ? 409 : 500;
        return sendError(res, statusCode, error.message);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, 'Email and password are required');
        }

        if (!isValidEmail(email)) {
            return sendError(res, 400, 'Please provide a valid email address');
        }

        const result = await userService.loginUser({ email, password });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: result.token,
            user: result.user,
        });
    } catch (error) {
        const statusCode = error.message.includes('Invalid email or password') ? 401 : 500;
        return sendError(res, statusCode, error.message);
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await userService.getCurrentUser(req.user.id);

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return sendError(res, 404, error.message);
    }
};

