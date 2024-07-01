import React, { useState } from 'react';
import axios from 'axios';

const AddRole = () => {
  const [roleName, setRoleName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/role/roles', {
        role_name: roleName,
      });
      console.log('Role created successfully:', response.data);
      // Reset form
      setRoleName('');
    } catch (error) {
      console.error('An error occurred while creating the role:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Add Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleName">
            Role Name
          </label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Role
        </button>
      </form>
    </div>
  );
};

export default AddRole;
