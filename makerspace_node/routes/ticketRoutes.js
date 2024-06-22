const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const {submitTicket, upload, getAllTickets, submitComment, getAllComments, getMyTickets, updateTicketStatus, updateTicket } = require('../controllers/ticketController');
router.post('/submitTicket', upload.array('attachments', 10), submitTicket);
router.get('/getAllTickets', getAllTickets);
router.post('/submitComment', submitComment);
router.get('/getAllComments', getAllComments);
router.get('/getMyTickets', authMiddleware, getMyTickets)
router.patch('/updateStatus/:id', updateTicketStatus);
router.patch('/updateTicket/:id', updateTicket);

module.exports = router;