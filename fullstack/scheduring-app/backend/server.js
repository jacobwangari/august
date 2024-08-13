// index.js or your main file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDB, printUsers } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  await connectToDB();  // Wait for the database connection
  await printUsers();   // Optionally print users

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api', userRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();
