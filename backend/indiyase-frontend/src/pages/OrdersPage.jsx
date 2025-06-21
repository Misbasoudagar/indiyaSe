import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setOrders(res.data))
      .catch(() => alert("Failed to load orders"));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Your Orders</h2>
      <ul className="list-disc pl-6">
        {orders.map((order, idx) => (
          <li key={idx}>Order ID: {order._id} | Total: ₹{order.total}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;

