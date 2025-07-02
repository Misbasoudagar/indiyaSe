const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");
const Order = require("../models/orderModel");
// const Product = require("../models/productModel"); // Uncomment if using Product

// ==========================
// 🔐 Admin Login
// ==========================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    return res.json({ success: true, message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
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
    console.error("❌ Failed to create order:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
});

// ==========================
// 🛠 ADMIN: Get All Orders
// ==========================
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

// ==========================
// 🔄 ADMIN: Update Order Status
// ==========================
router.put("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
});

// ==========================
// (Optional) Product Handlers
// ==========================
// Move these to productRoutes.js later

// router.put("/:id", async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


module.exports = router;
