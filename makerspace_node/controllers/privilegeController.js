const Privilege = require('../models/privilege');

// Controller to create a new privilege
const createPrivilege = async (req, res) => {
  try {
    const { privilege_name, description } = req.body;
    const newPrivilege = new Privilege({ privilege_name, description });
    await newPrivilege.save();
    res.status(201).json({ msg: 'Privilege created successfully', privilege: newPrivilege });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while creating the privilege' });
  }
};

// Controller to get all privileges
const getAllPrivileges = async (req, res) => {
  try {
    const privileges = await Privilege.find();
    res.status(200).json({ privileges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching privileges' });
  }
};

// Controller to get a privilege by ID
const getPrivilegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const privilege = await Privilege.findById(id);

    if (!privilege) {
      return res.status(404).json({ msg: 'Privilege not found' });
    }

    res.status(200).json({ privilege });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching the privilege' });
  }
};

const deletePrivilege = async (req, res) => {
    try {
      const { id } = req.params;
      const privilege = await Privilege.findByIdAndDelete(id);
  
      if (!privilege) {
        return res.status(404).json({ msg: 'Privilege not found' });
      }
  
      res.status(200).json({ msg: 'Privilege deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'An error occurred while deleting the privilege' });
    }
  };
  
  module.exports = {
    createPrivilege,
    getAllPrivileges,
    getPrivilegeById,
    deletePrivilege
  };