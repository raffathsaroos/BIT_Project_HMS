import mongoose from 'mongoose';
import { ALL_USER_ROLES, USER_ROLES as USER_ROLE_VALUES } from '../types/userRoles.js';

export const USER_ROLES = ALL_USER_ROLES;

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required'], trim: true, minlength: [2, 'Name must be at least 2 characters long'], maxlength: [80, 'Name cannot exceed 80 characters'] },
        email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'] },
        password: { type: String, required: [true, 'Password is required'], minlength: [8, 'Password must be at least 8 characters long'], select: false },
        role: { type: String, enum: ALL_USER_ROLES, default: USER_ROLE_VALUES.PATIENT, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
