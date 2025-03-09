const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;
const User = require('../Models/Users');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: "No authentication token" });
    }

    jwt.verify(token, SECRET, async (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }
        req.user = await User.findById(decodedToken.id).select("-password");
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
};

module.exports = { requireAuth, isAdmin };
