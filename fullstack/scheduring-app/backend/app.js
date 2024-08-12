const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// Middleware
app.use(cors()); 
app.use(express.json());

// MongoDB connection URI and database name
const uri = 'mongodb://localhost:27017';
const dbName = 'schedulingappdatabase';

// Create a MongoClient instance
const client = new MongoClient(uri);

let db;
let usersCollection;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    usersCollection = db.collection('users');
    console.log('Connected to MongoDB and user collection is set');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); 
  }
}

connectToDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Secret key for JWT
const JWT_SECRET = 'tyuyu';

// Register 
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({
      username,
      password: hashedPassword,
      email
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
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

// Get all users route
app.get('/users', async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Catch-all route handler for all other requests
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
