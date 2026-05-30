import jwt from 'jsonwebtoken';
import userDao from '../dao/userDao.js';

const getTokenFromHeader = (authorizationHeader) => {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return null;
    }

    return authorizationHeader.split(' ')[1];
};

export const protect = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req.headers.authorization);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is required',
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: 'JWT_SECRET is not configured',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userDao.getUserById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User attached to this token no longer exists',
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'This account is inactive. Please contact an administrator.',
            });
        }

        req.user = {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired authentication token',
        });
    }
};