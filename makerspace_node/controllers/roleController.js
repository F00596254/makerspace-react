const Role = require('../models/role');
const RolePrivilege = require('../models/rolePrivilege');

const createRole = async (req, res) => {
  try {
    const { role_name, privilege_ids } = req.body;
    const newRole = new Role({ role_name });
    await newRole.save();

    if (privilege_ids && privilege_ids.length > 0) {
      const rolePrivileges = privilege_ids.map(privilege_id => ({
        role_id: newRole._id,
        privilege_id
      }));
      await RolePrivilege.insertMany(rolePrivileges);
    }

    res.status(201).json({ msg: 'Role created successfully', role: newRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while creating the role' });
  }
};

// Controller to update a role's privileges
const updateRolePrivileges = async (req, res) => {
  try {
    const { id } = req.params;
    const { privilege_ids } = req.body;

    // Remove existing privileges
    await RolePrivilege.deleteMany({ role_id: id });

    // Add new privileges
    if (privilege_ids && privilege_ids.length > 0) {
      const rolePrivileges = privilege_ids.map(privilege_id => ({
        role_id: id,
        privilege_id
      }));
      await RolePrivilege.insertMany(rolePrivileges);
    }

    res.status(200).json({ msg: 'Role updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while updating the role' });
  }
};

// Controller to get all roles and their privileges
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    const rolesWithPrivileges = await Promise.all(
      roles.map(async role => {
        const rolePrivileges = await RolePrivilege.find({ role_id: role._id }).populate('privilege_id');
        const privileges = rolePrivileges.map(rp => rp.privilege_id);
        return { ...role._doc, privileges };
      })
    );
    res.status(200).json({ roles: rolesWithPrivileges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching roles' });
  }
};

// Controller to get a role by ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }

    const rolePrivileges = await RolePrivilege.find({ role_id: role._id }).populate('privilege_id');
    const privileges = rolePrivileges.map(rp => rp.privilege_id);

    res.status(200).json({ role: { ...role._doc, privileges } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching the role' });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await Role.findByIdAndDelete(id);
    await RolePrivilege.deleteMany({ role_id: id });
    res.status(200).json({ msg: 'Role deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while deleting the role' });
  }
};

module.exports = {
  createRole,
  updateRolePrivileges,
  getAllRoles,
  getRoleById,
  deleteRole
};
