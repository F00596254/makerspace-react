const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

 
 
router.post('/updatepassword',userController.updatepassword)
router.post('/updatenames',userController.updateNames)
router.post('/check-email',userController.checkEmailAccount)
router.post('/forgot-password',userController.forgotpassword)
router.post('/reset-password',userController.emailVerification)
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/userDetails', userController.userDetails);
router.post('/logout', userController.logout);

module.exports = router;
