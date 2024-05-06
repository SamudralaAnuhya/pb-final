import express, { json } from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import UserModel from '../models/user.js';
import jwt from "jsonwebtoken";
const JWT_SECRET = 'mysecret';
const JWT_REFRESH_SECRET = 'refreshsecret';

// signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'UserModel already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'UserModel created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Sign in route
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '10s' });
        const refreshToken = jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET, { expiresIn: '60s' });

        // Authentication successful
        res.json({ message: 'Signin successful', accessToken, refreshToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

        // Find the user based on the user ID from the decoded refresh token
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token
        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '10s' });

        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid refresh token' });
    }
});

export default router;