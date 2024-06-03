const express = require('express');
const { signup, signin, userDetails, logout } = require('../controllers/userController');
const router = express.Router();

 
 
router.post('/updatepassword',userController.updatepassword)
router.post('/updatenames',userController.updateNames)
router.post('/check-email',userController.checkEmailAccount)
router.post('/forgot-password',userController.forgotpassword)
router.post('/reset-password',userController.emailVerification)
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/userDetails', userDetails);
router.post('/logout', logout);

module.exports = router;
