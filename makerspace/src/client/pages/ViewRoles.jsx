import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/role/roles');
        setRoles(response.data.roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = async (roleId) => {
    try {
      await axios.delete('http://localhost:3000/role/${roleId}');
      setRoles(roles.filter(role => role._id !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">View Roles</h2>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Role Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Privileges
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role._id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {role.role_name}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {role.privileges.map(privilege => privilege.privilege_name).join(', ')}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  onClick={() => handleDelete(role._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRoles;
