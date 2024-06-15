const express = require('express');

const {getAllUsers, getUserById, updateUserById}=require('../controllers/adminController');
const router = express.Router();


const isAdmin = (req, res, next) => {
    // Implement your admin check logic here
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

// router.post('/users/:id/edit', adminEditable);
router.get("/getAllUsers",getAllUsers);
router.get('/getUser/:id', getUserById);
router.put('/updateUser/:id',updateUserById);
module.exports = router;