const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/userDetails',userController.userDetails)
router.post('/updatepassword',userController.updatepassword)
router.post('/updatenames',userController.updateNames)
router.post('/check-email',userController.checkEmailAccount)
router.post('/forgot-password',userController.forgotpassword)
router.post('/reset-password',userController.emailVerification)

module.exports = router;
