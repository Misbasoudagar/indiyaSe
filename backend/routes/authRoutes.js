const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require("../models/User");

// ✅ Register user
router.post('/register', authController.register);

// ✅ Login user
router.post('/login', authController.login);

// ✅ Get all users (admin only)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ Get user count
router.get("/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user count" });
  }
});

module.exports = router;
