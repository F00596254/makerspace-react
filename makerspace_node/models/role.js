const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role_name: { type: String, unique: true, required: true },
    privileges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Privilege' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
