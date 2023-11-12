const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization; 

    jwt.verify(token, secret, (err,decoded) => {
        if(err){
            res.status(401).send({msg:"You are not legged in"});
        }else {
            req.user = decoded;
            next();
        }
    })
}