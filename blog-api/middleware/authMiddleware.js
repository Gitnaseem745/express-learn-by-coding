const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({
                error: 'No authorization header',
                message: 'Access denied. Please provide an authorization token in the request header.'
            });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Invalid authorization format',
                message: 'Authorization header must start with "Bearer ". Example: "Bearer your_token_here"'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                error: 'No token provided',
                message: 'Access denied. No authentication token found.'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({
                    error: 'Token expired',
                    message: 'Your session has expired. Please log in again.'
                });
            }

            if (jwtError.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    error: 'Invalid token',
                    message: 'The provided token is invalid. Please log in again.'
                });
            }

            throw jwtError;
        }

        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({
                error: 'User not found',
                message: 'The user associated with this token no longer exists. Please log in again.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = auth;
