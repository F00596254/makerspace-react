const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Ticket = require('../models/tickets');
const Comment = require('../models/ticketComment');
const mailService = require('../service/mailService');
const shortid = require('shortid');
const { User, isSimilarPassword, forgotPasswordS } = require('../models/userModel');
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
    const { searchTerm, priority, department, ticketType, identity, status } = req.query;

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

    if (status) {
      query.status = status;
    }

    const tickets = await Ticket.find(query);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
  }
};

const submitComment = async (req, res) => {
  try{
    
    const ticket = await Ticket.findById(req.body.ticketID);
    if(!ticket){
      throw new Error('Some Backend Error 1 ');
    }
    email=ticket.email;
    const user =  await User.findOne({email});
    if(!user){
      throw new Error('Some Backend Error 2');
    }
    const parentTicket = await Comment.findOne({
      ticketId: req.body.ticketID,
      userId: user._id,
    }).sort({ createdAt: -1 });
    let parentCommentId=null;
    if(parentTicket){
      parentCommentId=parentTicket._id;
    }
    userId=user._id;
    const {ticketID,message,from} = req.body;
    const ticketComment = new Comment({ 
      ticketId:ticketID,
      comment:message,
      from,
      userId,
      parentCommentId

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
    const comments = await Comment.find({ ticketId }).sort({ createdAt: 1 });
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
const updateTicketStatus= async (req, res) => {
  const { id } = req.params;
    const { status } = req.body;

    try {
        // Assuming you have a Ticket model
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        ticket.status = status;
        await ticket.save();
        await mailService.sendMail({
          from: '',
          to: ticket.email,
          subject: 'You Ticket Status has been updated to ' + status,
          text: `There is an update to your ticket. New Status of your ticket ${ticket.ticketID} is ${status}`,
        });
        res.json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    } 
}

const updateTicket = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTicket) {
            return res.status(404).send('Ticket not found');
        }
        await mailService.sendMail({
          from: '',
          to: updatedTicket.email,
          subject: 'You have a change in your ticket from Admin side ' + updatedTicket.ticketID,
          text: `There is an update to your ticket. New chanegs are `,
        });
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const deleteTicket = async (req, res) => {
    let { id } = req.params;
    // id = `ObjectId(${id})`
    try {
        const ticket = await Ticket.findOne({_id: id});

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (ticket.status.toLowerCase() === 'shipped' || ticket.status.toLowerCase() === 'closed') {
            return res.status(400).json({ message: 'Cannot delete ticket with status shipped or closed' });
        }

        ticket.status = 'Cencelled';
        await ticket.save();
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


module.exports = { submitTicket, upload, getAllTickets, submitComment, getAllComments, getMyTickets, updateTicketStatus, updateTicket, deleteTicket  };
