const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    ticketType: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    details : {
        type: String,
        required: true,
    },
    ticketID: {
        type: String,
    },
    attachments: { type: [String], default: [] },  // Ensure attachments is an array of strings

});
module.exports = mongoose.model('Ticket', ticketSchema);