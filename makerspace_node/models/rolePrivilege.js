const mongoose = require('mongoose');

const rolePrivilegeSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  privilege_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Privilege', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const RolePrivilege = mongoose.model('RolePrivilege', rolePrivilegeSchema);

module.exports = RolePrivilege;
