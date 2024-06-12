const express = require('express');
const { signup, signin, userDetails, logout, updatepassword, updateNames, checkEmailAccount, forgotpassword, emailVerification } = require('../controllers/userController');
const router = express.Router();

 
 
router.post('/updatepassword', updatepassword)
router.post('/updatenames', updateNames)
router.post('/check-email', checkEmailAccount)
router.post('/forgot-password', forgotpassword)
router.post('/reset-password', emailVerification)
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/userDetails', userDetails);
router.post('/logout', logout);

module.exports = router;
