const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getUsersCollection } = require('../config/db');


router.get('/users', verifyToken, async (req, res) => {
  try {
    const usersCollection = getUsersCollection(); 
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
