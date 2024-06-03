const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketCommentSchema = new Schema({
    ticketId: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Comment', ticketCommentSchema);