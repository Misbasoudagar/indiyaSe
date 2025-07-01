import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem("userEmail"); // or replace with real login system

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${userEmail}`);
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      }
    };

    if (userEmail) fetchOrders();
  }, [userEmail]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border rounded p-4 mb-4 shadow-sm">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <div className="mt-2">
              {order.products.map((prod, i) => (
                <div key={i} className="text-sm text-gray-700 ml-2">
                  - {prod.name} × {prod.quantity || 1}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrdersPage;
