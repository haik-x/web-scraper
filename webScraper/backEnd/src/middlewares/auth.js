const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = process.env.SECRET_KEY;


const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, secret, (err,decoded) => {
            if(err){
                console.error('JWT Verification Error:', err);
                res.redirect('/');
            }else {
                req.user = decoded;
                next();
            }
        })
    }
    else {
        res.redirect('/');
    }
    
}

const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, secret, async (err,decoded) => {
            if(err){
                res.locals.user = null;
                req.user = null;
                next();
            }else {
                let user = await User.findById(decoded.id);
                res.locals.user = user;
                req.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        req.user = null;
        next();
    }
    
}

module.exports = {
    authMiddleware,
    checkUser
}