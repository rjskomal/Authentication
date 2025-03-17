const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

const maxAge = 3 * 24 * 60 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, SECRET, { expiresIn: maxAge });
};

module.exports.signup_get = (req, res) => {
    res.send("Hello from signup_get");
};

module.exports.login_get = (req, res) => {
    console.log('in login get', req.cookies.jwt);
    res.send("Hello from login_get");
};

module.exports.signup_post = async (req, res) => {
    const { email, username, password, role } = req.body;  
    try {
        const user = await User.create({ 
            email, 
            username, 
            password, 
            role: role || "user"  
        });

        res.status(201).json({ user: user._id, role: user.role });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};


module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({ user: user._id, role: user.role });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.logout_user = async (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).send('Logged out successfully');
};

module.exports.userDetails = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }

        const details = await User.findOne({ _id: req.user.id });
        if (!details) {
            return res.status(404).send('User not found');
        }

        res.send(details);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};
