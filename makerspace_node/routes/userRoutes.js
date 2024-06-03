const express = require('express');
const { signup, signin, userDetails, logout } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/userDetails', userDetails);
router.post('/logout', logout);

module.exports = router;
