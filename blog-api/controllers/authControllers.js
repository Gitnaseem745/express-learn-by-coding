const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Username, email, and password are all required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                error: 'User already exists',
                message: 'A user with this email address already exists. Please use a different email or try logging in.'
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                error: 'Weak password',
                message: 'Password must be at least 6 characters long'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        const token = user.generateToken();

        res.status(201).json({
            message: 'User registration successful.',
            user: { username: user.username, email: user.email },
            token: token
        });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                error: 'Missing credentials',
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'No account found with this email address. Please check your email or register for a new account.'
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'Incorrect password. Please try again.'
            });
        }

        const token = user.generateToken();
        res.json({
            message: 'Login successful',
            user: { username: user.username, email: user.email },
            token: token
        });
    } catch (error) {
        next(error);
    }
}
