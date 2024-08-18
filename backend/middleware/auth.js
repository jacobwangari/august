const jwt = require('jsonwebtoken');
const tokenBlacklist = require('../config/tokenBlacklist');

const JWT_SECRET = "tyuyu"

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    console.log(tokenBlacklist);
    console.log(token);

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (tokenBlacklist.includes(token)) {
        return res.status(401).send('Token has been blacklisted');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({Message: 'Invalid Token'});
    }
    return next();
}

module.exports = { verifyToken };