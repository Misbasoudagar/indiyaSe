// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// ✅ Get all products (with optional limit, category filtering later)
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50; // Optional ?limit=20
    const products = await Product.find().limit(limit);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Add product manually
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Failed to add product", error: err.message });
  }
});

// ✅ Edit product by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete product by ID
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Seed dummy products manually (optional)
router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany([
      {
        name: "Ayurvedic Syrup",
        description: "Natural immune booster",
        price: 250,
        image: ""
      },
      {
        name: "Herbal Soap",
        description: "Chemical-free skincare",
        price: 90,
        image: ""
      }
    ]);
    res.send("Dummy products seeded");
  } catch (err) {
    res.status(500).json({ message: "Seeding failed", error: err.message });
  }
});

module.exports = router;
