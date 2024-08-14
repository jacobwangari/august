// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = "tyutyu";

const verifyToken = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.header('Authorization');

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  // Check if the token starts with "Bearer "
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'Invalid token format' });
  }

  // Extract the token from the header
  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };
