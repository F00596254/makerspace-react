const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Ticket = require('../models/tickets');
const Comment = require('../models/ticketComment');
const mailService = require('../service/mailService');
const shortid = require('shortid');
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
  ticketID = name.substr(0,3) + department.charAt(0).toUpperCase() + ticketType.charAt(0).toUpperCase()  + role.charAt(0).toUpperCase()  +  shortid.generate();
  try {
    const ticket = new Ticket({
      email,
      name,
      phone,
      department,
      priority,
      ticketType,
      role,
      ticketID ,
      subject,
      details,
      attachments: req.files ? req.files.map(file => file.path) : [],
    });
    await ticket.save();
    await mailService.sendMail({
      from: '',
      to: email,
      subject: 'Ticket Submitted Successfully',
      text: `Your ticket has been submitted successfully. Your ticket ID is ${ticketID}`,
    });

    res.status(200).json({ message: 'Ticket submitted successfully' });
  } catch (error) {
    console.error('Error submitting ticket:', error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to submit ticket', error: error.message });
  }
};


const getAllTickets = async (req, res) => {
  try {
    const { searchTerm, priority, department, ticketType, identity } = req.query;

    // Construct a dynamic query object
    let query = {};

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { ticketType: { $regex: searchTerm, $options: 'i' } },
        { priority: { $regex: searchTerm, $options: 'i' } },
        { ticketID: { $regex: searchTerm, $options: 'i' } },
        { subject: { $regex: searchTerm, $options: 'i' } },
        { details: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    if (priority) {
      query.priority = priority;
    }

    if (department) {
      query.department = department;
    }

    if (ticketType) {
      query.ticketType = ticketType;
    }

    if (identity) {
      query.identity = identity;
    }

    const tickets = await Ticket.find(query);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
  }
};

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
    const { ticketId } = req.query;
    const comments = ticketId ? await Comment.find({ ticketId }) : await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve comments', error: error.message });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const { email } = req;
    const { searchTerm, priority, department, ticketType, identity } = req.query;

    // Construct a dynamic query object
    let query = { email };

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { ticketType: { $regex: searchTerm, $options: 'i' } },
        { priority: { $regex: searchTerm, $options: 'i' } },
        { ticketID: { $regex: searchTerm, $options: 'i' } },
        { subject: { $regex: searchTerm, $options: 'i' } },
        { details: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    if (priority) {
      query.priority = priority;
    }

    if (department) {
      query.department = department;
    }

    if (ticketType) {
      query.ticketType = ticketType;
    }

    if (identity) {
      query.identity = identity;
    }

    const tickets = await Ticket.find(query);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
  }
};

module.exports = { submitTicket, upload, getAllTickets, submitComment, getAllComments, getMyTickets };
