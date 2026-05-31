import userService, { ADMIN_CREATABLE_ROLES } from '../services/userService.js';

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const sendError = (res, statusCode, message) => res.status(statusCode).json({
    success: false,
    message,
});

const validateUserInput = ({ name, email, password }) => {
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

export const createUserByAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const validationError = validateUserInput({ name, email, password });

        if (validationError) {
            return sendError(res, 400, validationError);
        }

        if (!role) {
            return sendError(res, 400, 'Role is required');
        }

        if (!ADMIN_CREATABLE_ROLES.includes(role)) {
            return sendError(res, 400, `Invalid staff role. Admin can create: ${ADMIN_CREATABLE_ROLES.join(', ')}`);
        }

        const user = await userService.createUserByAdmin({ name, email, password, role });

        return res.status(201).json({
            success: true,
            message: 'User created successfully by admin',
            user,
        });
    } catch (error) {
        const statusCode = error.message.includes('already exists') ? 409 : 500;
        return sendError(res, statusCode, error.message);
    }
};
