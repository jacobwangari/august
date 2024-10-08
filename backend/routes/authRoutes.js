const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const tokenBlacklist = require('../config/tokenBlacklist');
const jwt = require('jsonwebtoken');
const { getUsersCollection } = require('../config/db');
require('dotenv').config();

const JWT_SECRET = "tyuyu"



router.post('/logout', (req, res) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!tokenBlacklist.includes(token)) {
        tokenBlacklist.push(token);
    }

    return res.status(200).json({ message: 'Logged out successfully' });
});


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("this  is jwt "+JWT_SECRET);


    try {
        const usersCollection = getUsersCollection();
        const existingUser = await usersCollection.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({
            username,
            password: hashedPassword,
            email,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const usersCollection = getUsersCollection();
        const user = await usersCollection.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
