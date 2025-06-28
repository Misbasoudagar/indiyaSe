import React, { useEffect, useState } from 'react';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchUserOrders = async () => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    if (!user?.token) {
      setError("Not logged in");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders/my", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to load orders");

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load orders.");
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (error) return <div>❌ {error}</div>;

  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.map((order, index) => (
        <div key={index} className="border p-4 my-2">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
};

export default UserOrdersPage;
