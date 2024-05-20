const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const multer = require('multer'); 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });


router.post('/sendEmail', upload.array('attachments', 5), emailController.sendEmail);

module.exports = router;
