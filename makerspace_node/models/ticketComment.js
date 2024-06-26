const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketCommentSchema = new Schema({
    ticketId: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    comment: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', ticketCommentSchema);
