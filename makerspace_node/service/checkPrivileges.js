const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Role = require('../models/role');
const RolePrivilege = require('../models/rolePrivilege');
const Privilege = require('../models/privilege');
const key = require('../config/secret');

async function checkPrivilege(requiredPrivilege) {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(403).json({ msg: 'No token provided' });
      }

      const decoded = jwt.verify(token, key);
      const user = await User.findOne({ email: decoded }).populate('role_id');

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const rolePrivileges = await RolePrivilege.find({ role_id: user.role_id._id }).populate('privilege_id');
      const userPrivileges = rolePrivileges.map(rp => rp.privilege_id.privilege_name);

      if (userPrivileges.includes(requiredPrivilege)) {
        next(); 
      } else {
        res.status(403).json({ msg: 'Access denied' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'An error occurred while processing your request' });
    }
  };
}

module.exports = checkPrivilege;
