const router = require('express').Router();
const userModel = require('../models/users/userModel');
const auth = require('../authentication/auth');


router.post('/register', userModel.registerUser);
router.post('/login', userModel.loginUser);
router.get('/', auth.verifyAdminToken, userModel.getUsers);
router.get('/:id',auth.verifyAdminToken, userModel.getOneUser);

module.exports = router;