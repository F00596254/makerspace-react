import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LinkRolePrivilege = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [privileges, setPrivileges] = useState([]);
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);

  useEffect(() => {
    fetchRoles();
    fetchPrivileges();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/role/roles');
      setRoles(response.data.roles);
    } catch (error) {
      console.error('An error occurred while fetching roles:', error);
    }
  };

  const fetchPrivileges = async () => {
    try {
      const response = await axios.get('http://localhost:3000/privilege/privileges');
      setPrivileges(response.data.privileges);
    } catch (error) {
      console.error('An error occurred while fetching privileges:', error);
    }
  };

  const handlePrivilegeChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedPrivileges(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/role/roles/${selectedRole}`, {
        privilege_ids: selectedPrivileges,
      });
      console.log('Role updated successfully:', response.data);
      // Reset form
      setSelectedRole('');
      setSelectedPrivileges([]);
    } catch (error) {
      console.error('An error occurred while updating the role:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Link Role to Privileges</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roles">
            Roles
          </label>
          <select
            id="roles"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="privileges">
            Privileges
          </label>
          <select
            id="privileges"
            multiple
            value={selectedPrivileges}
            onChange={handlePrivilegeChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {privileges.map((privilege) => (
              <option key={privilege._id} value={privilege._id}>
                {privilege.privilege_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Link Privileges
        </button>
      </form>
    </div>
  );
};

export default LinkRolePrivilege;
