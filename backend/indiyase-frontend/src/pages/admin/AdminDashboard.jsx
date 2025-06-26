import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const fetchCounts = async () => {
    try {
      const productRes = await axios.get("http://localhost:5000/api/products/count");
      setProductCount(productRes.data.count);

      const orderRes = await axios.get("http://localhost:5000/api/orders/count");
      setOrderCount(orderRes.data.count);

      const userRes = await axios.get("http://localhost:5000/api/auth/count");
      setUserCount(userRes.data.count);
    } catch (err) {
      console.error("❌ Failed to fetch dashboard counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);
  function AdminDashboard() {
    return (
      <div style={{ padding: "20px" }}>
        <h2>📊 Admin Dashboard</h2>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <Box title="🧴 Products" value={productCount} />
          <Box title="🧾 Orders" value={orderCount} />
          <Box title="👤 Users" value={userCount} />
        </div>
      </div>
       );
      };
    }
const Box = ({ title, value }) => (
  <div style={boxStyle}>
    <h3>{title}</h3>
    <p style={{ fontSize: "24px" }}>{value}</p>
  </div>
);

const boxStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "10px",
  width: "150px",
  textAlign: "center",
  background: "#f9f9f9",
};

export default AdminDashboard;
