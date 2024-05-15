const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    attachments: [{
        filename: String,
        path: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Email', emailSchema);
