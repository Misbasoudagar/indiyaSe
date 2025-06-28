// backend/routes/adminUserRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { getAllUsers } = require("../controllers/adminUserController");

router.get("/users", getAllUsers);


// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "email role isActive");
    res.json(users); // should return an array
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
