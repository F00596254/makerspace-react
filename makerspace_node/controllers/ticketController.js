const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Ticket = require('../models/tickets');
const Comment = require('../models/ticketComment');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      req.body.file = filename; // Add this line
      cb(null, filename);
    },
  });

const upload = multer({ storage });

const submitTicket = async (req, res) => {
  const { email, name, phone, department, priority, ticketType, role, subject, details } = req.body;

  try {
    const ticket = new Ticket({
      email,
      name,
      phone,
      department,
      priority,
      ticketType,
      role,
      subject,
      details,
      attachments: req.files ? req.files.map(file => file.path) : [],
    });

    await ticket.save();
    res.status(200).json({ message: 'Ticket submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit ticket', error: error.message });
  }
};


const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
    }
    }

const submitComment = async (req, res) => {
  try{
    const {id, comment} = req.body;
    const ticketComment = new Comment({ 
      ticketId:id,
      comment
    });
    await ticketComment.save();
    res.status(200).json({message: 'Comment submitted successfully'});
  }
  catch (error) {
    res.status(500).json({ message: 'Failed to submit comment', error: error.message });
}
}

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve comments', error: error.message });
  }
}
module.exports = { submitTicket, upload, getAllTickets, submitComment, getAllComments };
