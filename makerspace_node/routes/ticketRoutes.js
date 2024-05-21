const express = require('express');
const router = express.Router();
const {submitTicket, upload } = require('../controllers/ticketController');
router.post('/submitTicket', upload.array('attachments', 10), submitTicket);

module.exports = router;