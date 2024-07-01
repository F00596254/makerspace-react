const express = require('express');
const {
  createRole,
  updateRolePrivileges,
  getAllRoles,
  getRoleById,
  deleteRole
} = require('../controllers/roleController');
const router = express.Router();

router.post('/roles', createRole);
router.put('/roles/:id', updateRolePrivileges);
router.get('/roles', getAllRoles);
router.get('/roles/:id', getRoleById);
router.delete('/:id', deleteRole);


module.exports = router;
