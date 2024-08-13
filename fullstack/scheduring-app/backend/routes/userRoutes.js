const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); 
const { usersCollection } = require('../config/db'); 

// Get all users route
router.get('/users', async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
