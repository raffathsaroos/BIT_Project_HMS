import authService from '../services/authService.js';

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const sendError = (res, statusCode, message) => res.status(statusCode).json({
    success: false,
    message,
});

const validateSignupInput = ({ name, email, password }) => {
    if (!name || !email || !password) {
        return 'Name, email, and password are required';
    }

    if (!isValidEmail(email)) {
        return 'Please provide a valid email address';
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    return null;
};

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const validationError = validateSignupInput({ name, email, password });

        if (validationError) {
            return sendError(res, 400, validationError);
        }

        const result = await authService.signupUser({ name, email, password });

        return res.status(201).json({
            success: true,
            message: 'Patient signup successful',
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

        const result = await authService.loginUser({ email, password });

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
        const user = await authService.getCurrentUser(req.user.id);

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return sendError(res, 404, error.message);
    }
};
