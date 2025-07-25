// backend/routes/adminUserRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// ✅ FIXED: Match /api/admin/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "email role isActive");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
