import userDao from '../dao/userDao.js';
import { USER_ROLES } from '../models/user.js';
import { hashPassword, normalizeEmail, sanitizeUser } from './authService.js';

export const ADMIN_CREATABLE_ROLES = [
    'admin',
    'doctor',
    'nurse',
    'pharmacist',
    'lab_technician',
    'radiologist',
];

const createUserWithRole = async ({ name, email, password, role }) => {
    const normalizedEmail = normalizeEmail(email);

    if (!USER_ROLES.includes(role)) {
        throw new Error(`Invalid role. Allowed roles: ${USER_ROLES.join(', ')}`);
    }

    const existingUser = await userDao.getUserByEmail(normalizedEmail);
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    const user = await userDao.createUser({
        name: name.trim(),
        email: normalizedEmail,
        password: await hashPassword(password),
        role,
    });

    return user;
};

const createUserByAdmin = async ({ name, email, password, role }) => {
    if (!ADMIN_CREATABLE_ROLES.includes(role)) {
        throw new Error(`Invalid staff role. Admin can create: ${ADMIN_CREATABLE_ROLES.join(', ')}`);
    }

    const user = await createUserWithRole({ name, email, password, role });

    return sanitizeUser(user);
};

const ensureDefaultAdmin = async () => {
    const adminCount = await userDao.countUsersByRole('admin');
    if (adminCount > 0) {
        return null;
    }

    const name = process.env.DEFAULT_ADMIN_NAME || 'Master Admin';
    const email = process.env.DEFAULT_ADMIN_EMAIL;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;

    if (!email || !password) {
        console.log('Default admin was not created because DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD is missing');
        return null;
    }

    if (password.length < 8) {
        throw new Error('DEFAULT_ADMIN_PASSWORD must be at least 8 characters long');
    }

    const admin = await createUserWithRole({
        name,
        email,
        password,
        role: 'admin',
    });

    console.log(`Default admin created: ${admin.email}`);
    return sanitizeUser(admin);
};

const userService = {
    createUserByAdmin,
    ensureDefaultAdmin,
};

export default userService;
