const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Optional, if you're using auth
const Order = require('../models/orderModel');

// ==========================
// 🔐 USER: Get My Orders (Protected)
// ==========================
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.user.email }) // or use userId if you have
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load orders', error: error.message });
  }
});

// ==========================
// 🧾 USER: Place New Order
// ==========================
router.post("/", async (req, res) => {
  try {
    const { products, address, userEmail, totalAmount, status } = req.body;

    if (!products || !address || !userEmail || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      products,
      address,
      userEmail,
      totalAmount,
      status: status || "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
});

module.exports = router;
