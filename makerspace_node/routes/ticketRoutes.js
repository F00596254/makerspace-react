const express = require('express');
const router = express.Router();
const {submitTicket, upload, getAllTickets, submitComment, getAllComments } = require('../controllers/ticketController');
router.post('/submitTicket', upload.array('attachments', 10), submitTicket);
router.get('/getAllTickets', getAllTickets);
router.post('/submitComment', submitComment);
router.get('/getAllComments', getAllComments);
module.exports = router;