const express = require('express');
const {
  createPrivilege,
  getAllPrivileges,
  getPrivilegeById,
  deletePrivilege
} = require('../controllers/privilegeController');
const router = express.Router();

router.post('/privileges', createPrivilege);
router.get('/privileges', getAllPrivileges);
router.get('/privileges/:id', getPrivilegeById);
router.delete('/:id', deletePrivilege);


module.exports = router;
