const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mongoose = require("mongoose");

// Define Admin Schema
const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Admin = mongoose.model("Admin", AdminSchema);

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    return res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("❌ Error during admin login:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
