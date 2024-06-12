const mongoose = require('mongoose');

const privilegeSchema = new mongoose.Schema({
  privilege_name: { type: String, unique: true, required: true },
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Privilege', privilegeSchema);
