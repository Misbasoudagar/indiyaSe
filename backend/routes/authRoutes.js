const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require("../models/User");

router.post('/register', authController.register);
router.post('/login', authController.login);

// GET /api/auth/count - Get user count
router.get("/count", async (req, res) => {
    try {
      const count = await User.countDocuments();
      res.json({ count });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user count" });
    }
  });
  
module.exports = router;
