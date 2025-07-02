import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders/admin")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to load orders", err));
  }, []);

  const [filter, setFilter] = useState({email:'',status:'', date:''});

function applyFilters(all) {
  return all.filter(o => 
    (!filter.email || o.userEmail.includes(filter.email)) &&
    (!filter.status || o.status===filter.status)
    // and date filter...
  );
}
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status: newStatus });
      setOrders(prev => prev.map(order =>
        order._id === id ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
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
              <td>{o.user?.email}</td>
              <td>₹{o.total}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>
                {o.status !== "Delivered" && (
                  <button onClick={() => handleStatusUpdate(o._id, "Delivered")}>
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrderList;
