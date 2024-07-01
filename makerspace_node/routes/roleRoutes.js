const express = require('express');
const {
  createRole,
  updateRolePrivileges,
  getAllRoles,
  getRoleById
} = require('../controllers/roleController');
const router = express.Router();

router.post('/roles', createRole);
router.put('/roles/:id', updateRolePrivileges);
router.get('/roles', getAllRoles);
router.get('/roles/:id', getRoleById);

module.exports = router;
