import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewPrivilege = () => {
  const [privileges, setPrivileges] = useState([]);

  useEffect(() => {
    fetchPrivileges();
  }, []);

  const fetchPrivileges = async () => {
    try {
      const response = await axios.get('http://localhost:3000/privilege/privileges');
      setPrivileges(response.data.privileges);
    } catch (error) {
      console.error('An error occurred while fetching privileges:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/privilege/${id}`);
      fetchPrivileges(); // Refresh the list after deletion
    } catch (error) {
      console.error('An error occurred while deleting the privilege:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Privileges</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Privilege Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {privileges.map((privilege) => (
            <tr key={privilege._id}>
              <td className="py-2 px-4 border-b">{privilege.privilege_name}</td>
              <td className="py-2 px-4 border-b">{privilege.description}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDelete(privilege._id)}
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

export default ViewPrivilege;
