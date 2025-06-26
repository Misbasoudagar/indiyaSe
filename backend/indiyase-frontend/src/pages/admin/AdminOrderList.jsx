import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to fetch orders:', err));
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:5000/api/admin/orders/${orderId}/status`, { status: newStatus })
      .then(() => {
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch(err => console.error('Failed to update order status:', err));
  };

  return (
    <div>
      <h2>📦 Manage Orders</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Ordered At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr key={o._id}>
              <td>{idx + 1}</td>
              <td>{o.user?.email || 'Unknown'}</td>
              <td>₹{o.totalAmount}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td>
                <select value={o.status} onChange={(e) => handleStatusChange(o._id, e.target.value)}>
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;
