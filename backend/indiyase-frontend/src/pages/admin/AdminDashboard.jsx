import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <Link to="/admin/products">Manage Products</Link>
    </div>
  );
};

export default AdminDashboard;
