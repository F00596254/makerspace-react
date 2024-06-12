const User = require('../models/user');
const jwt = require('jsonwebtoken');
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
      const user = await User.findOne({ email: decoded }).populate({
        path: 'role_id',
        populate: { path: 'privileges' }
      });

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const userPrivileges = user.role_id.privileges.map(priv => priv.privilege_name);
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
