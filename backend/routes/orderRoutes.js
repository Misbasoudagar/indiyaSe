const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

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
