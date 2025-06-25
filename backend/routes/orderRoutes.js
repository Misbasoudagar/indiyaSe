// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// PUT /api/orders/:id/status
router.put("/:id/status", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error updating order status", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Save order
router.post("/", async (req, res) => {
  const { products } = req.body;
  const total = products.reduce((sum, p) => sum + p.price, 0);

  const order = new Order({ products, total });
  await order.save();

  res.json({ message: "Order placed", order });
});

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
