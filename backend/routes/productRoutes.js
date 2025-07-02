// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Seed dummy products (run once)
router.get("/seed", async (req, res) => {
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
  res.send("Products seeded");
});

// ✅ Add product
// POST /api/products - Add new product
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


// ✅ Edit product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
