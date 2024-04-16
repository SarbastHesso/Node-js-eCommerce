const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretkey = process.env.SECRET_KEY;

exports.generateToken = (user) => {
    return jwt.sign({id: user._id, firstName: user.firstName, email: user.email, isAdmin: user.isAdmin}, secretkey, {expiresIn: '24h'})
};

exports.verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const userData = jwt.verify(token, secretkey)
        req.user = userData
        next()
    }
    catch{
        return res.status(401).json({
            statusCode: 401,
            status: false,
            message: 'Access Restricted! Please Login'
        })
    }
}

exports.verifyAdminToken = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else {
        return res.status(401).json({
            statusCode: 401,
            status: false,
            message: 'Invalid Admin token'
        })
    }
}