const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.SECRET;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                req.user = {id : decodedToken.id}
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
}

module.exports = {requireAuth};