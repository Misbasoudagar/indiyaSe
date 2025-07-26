import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // custom black text styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', wallet: '' });

  // ✅ Fetch users
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


  // ✅ Start editing
  const handleEdit = (user) => {
    setEditUser(user._id);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      wallet: user.wallet || '',
    });
  };

  // ✅ Save edited user
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
    <div className="user-list-container">
      <h2>User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Wallet ₹</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.customerId || `CUS${u._id.slice(-6).toUpperCase()}`}</td>
              <td>
                {editUser === u._id ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  u.name
                )}
              </td>
              <td>
                {editUser === u._id ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  u.email
                )}
              </td>
              <td>
                {editUser === u._id ? (
                  <input
                    type="number"
                    value={formData.wallet}
                    onChange={e => setFormData({ ...formData, wallet: e.target.value })}
                  />
                ) : (
                  u.wallet
                )}
              </td>
              <td>
                {editUser === u._id ? (
                  <button className="save-btn" onClick={handleUpdate}>Save</button>
                ) : (
                  <button className="edit-btn" onClick={() => handleEdit(u)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
