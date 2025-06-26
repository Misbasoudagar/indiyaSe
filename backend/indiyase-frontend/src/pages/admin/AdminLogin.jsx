// src/pages/admin/AdminLogin.jsx

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
        password,
      });
      if (res.data.success) {
        alert("✅ Login successful");
        navigate("/admin/dashboard");
      } else {
        alert("❌ Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login error", err);
      alert("❌ Login failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🔐 Admin Login</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: "300px" }}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
