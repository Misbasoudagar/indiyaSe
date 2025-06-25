import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch orders", err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: newStatus,
      });
      alert("✅ Status updated!");
      fetchOrders(); // Refresh after update
    } catch (err) {
      console.error("❌ Failed to update status", err);
      alert("❌ Update failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 All Orders</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Ordered At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order._id}>
              <td>{idx + 1}</td>
              <td>{order.userEmail || "N/A"}</td>
              <td>{order.items?.length || 0}</td>
              <td>₹{order.totalAmount}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
