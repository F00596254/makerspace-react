const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Ticket = require('../models/tickets');
const mailService = require('../service/mailService');
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
    mailService.sendMail({
      from: '',
      to: email,
      subject: 'Ticket Submitted Successfully',
      text: `Your ticket has been submitted successfully. Your ticket ID is ${ticket._id}`,
    });
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

module.exports = { submitTicket, upload, getAllTickets };
