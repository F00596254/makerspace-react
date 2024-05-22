const express = require('express');
const router = express.Router();
const {submitTicket, upload, getAllTickets } = require('../controllers/ticketController');
router.post('/submitTicket', upload.array('attachments', 10), submitTicket);
router.get('/getAllTickets', getAllTickets);
module.exports = router;