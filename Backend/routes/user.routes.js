const express =  require('express');
const router = express.Router();
const {body} = require('express-validator');
const { registerUser, loginUser, logoutUser, getProfile, donationSubmited, getDonationsByUserId } = require('../controller/user.controller');
const { isLogIn } = require('../middleware/isLoggedIn');

router.post('/register' , [
    body('fullname').isLength({min:5}).withMessage('full name must be at least 3 character long'),
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password must be at least 8 character long')
] , registerUser)

router.post('/login' , [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password must be at least 8 character long')
] , loginUser)

router.get('/profile' , isLogIn , getProfile )

router.get('/logout', logoutUser )

router.post('/donationSubmit' , isLogIn, donationSubmited )

router.get('/donations' , isLogIn , getDonationsByUserId)

module.exports = router;