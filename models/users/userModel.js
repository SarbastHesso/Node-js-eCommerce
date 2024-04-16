const mongodb = require('mongoose');
const User = require('./userSchema');
const bcrypt = require('bcrypt');
const auth = require('../../authentication/auth');

exports.registerUser = (req, res) => {
    User.exists({email: req.body.email}, (err, result) => {
        if(err){
            return res.status(400).json(err)
        } else {
            if (result){
                return res.status(400).json({
                    statusCode: 400,
                    status: false,
                    message: 'This email is already taken'
                })
            } else {
                const salt = bcrypt.genSaltSync(10);
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            statusCode: 500,
                            status: false,
                            message: 'Failed when encrypting user password' 
                        })
                    } else {
                        const newUser = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            passwordHash: hash,
                            isAdmin: req.body.isAdmin
                        })
                        newUser.save()
                        .then(() => {
                            res.status(201).json({
                                statusCode: 201,
                                status: true,
                                message: 'A new user created successfully',
                                token: auth.generateToken(newUser),
                                _id: newUser._id,
                                firstName: newUser.firstName,
                                email: newUser.email,
                                isAdmin: newUser.isAdmin
                            })
                        })
                        .catch(() => {
                            res.stauts(500).json({
                                statusCode: 500,
                                status: false,
                                message: 'Failed to create a new user'
                            })
                        })
                    }
                })
            }
        }
    })
}

exports.loginUser = (req, res) => {
    User.findOne({email: req.body.email})
    .then((user) => {
        if(user === null){
            return res.status(404).json({
                statusCode: 404,
                status: false,
                message: 'Incorrect email or password'
            })
        } else {
            bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
                if(err){
                    return res.status(400).json(err)
                } else {
                    if (result){
                        res.status(200).json({
                            statusCode: 200,
                            status: true,
                            message: 'The authentication was successful',
                            token: auth.generateToken(user),
                            _id: user._id,
                            firstName: user.firstName,
                            email: user.email,
                            isAdmin: user.isAdmin
                        })
                    } else {
                        res.status(401).json({
                            statusCode:401,
                            status: false,
                            message: 'Incorrect email or password'
                        })
                    }
                }
            })
        }
    })
    .catch(() => {
        return res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Failed to get User'
          })
    })
}


exports.getUsers = (req, res) => {
    User.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
};

exports.getOneUser = (req, res) => {
    User.exists({_id: req.params.id}, (err, result) => {
        if(err){
            return res.status(400).json(err)
        }else {
            if(result){
                User.findById(req.params.id)
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500).json(err)) 
            }else {
                return res.status(404).json({
                    statusCode: 404,
                    status: false,
                    message: 'This user does not exist'
                })
            }
        }
    })
}