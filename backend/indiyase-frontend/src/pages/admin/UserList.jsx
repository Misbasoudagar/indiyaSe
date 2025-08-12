import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // custom black text styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', wallet: '' });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUserHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditUser(user._id);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      wallet: user.wallet || '',
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${editUser}`, {
        ...formData
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Customer ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Wallet ₹</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{u.customerId || `CUS${u._id.slice(-6).toUpperCase()}`}</td>
                <td className="px-4 py-2">
                  {editUser === u._id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border px-2 py-1 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white">{u.name}</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {editUser === u._id ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border px-2 py-1 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white">{u.email}</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {editUser === u._id ? (
                    <input
                      type="number"
                      value={formData.wallet}
                      onChange={(e) => setFormData({ ...formData, wallet: e.target.value })}
                      className="border px-2 py-1 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white">{u.wallet}</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {editUser === u._id ? (
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteUserHandler(u._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
