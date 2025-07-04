import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{
        width: '220px',
        background: '#f4f4f4',
        padding: '20px',
        height: '100vh',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
      }}>
        
        <h2>Admin Panel</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/admin/products">Product List</Link></li>
          <li><Link to="/admin/add-product">Add Product</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
      <li><Link to="/admin/wallets">Wallets</Link></li>
      <li><Link to="/admin/orders">Manage Orders</Link></li>
      <li><Link to="/admin/sellers">Manage Sellers</Link></li>
      


        </ul>
      </nav>
      <main style={{ flexGrow: 1, padding: '20px' }}>
      
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
