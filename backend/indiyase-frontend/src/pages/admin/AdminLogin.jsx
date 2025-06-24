import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password
      });

      if (res.data.success) {
        alert("✅ Login successful");
        localStorage.setItem("isAdmin", "true");
        navigate("/admin/products");
      }
    } catch (err) {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🔐 Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div><br />
        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
