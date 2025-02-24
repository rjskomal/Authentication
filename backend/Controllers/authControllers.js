const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const { use } = require('../Routes/authRoutes');
require('dotenv').config();
const SECRET = process.env.SECRET;


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id},SECRET,{expiresIn: maxAge}
    );
}

module.exports.signup_get = (req, res) => {
    res.send("Hello from signup_get");
}

module.exports.login_get = (req, res) => {
    res.send("Hello from login_get");
}

module.exports.signup_post = async (req, res) => {
    const {email,username, password} = req.body;

    try {
        const user = await User.create({email,username, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user : user._id});
        console.log({user : user._id});
        
    }
    catch(err) {
        console.log(err);
        res.status(400).send("Error, user not created");
    }
}

module.exports.login_post = async (req, res) => {
    const {email , password} = req.body;
    try{
        const user = await User.login(email, password);
        res.status(200).json({user : user._id});
    }
    catch(err){
        res.status(400).send("Error, user not found");
    }
}