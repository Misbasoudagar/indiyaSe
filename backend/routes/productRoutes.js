const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Seed dummy products (run once)
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

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);const express = require("express");
  const router = express.Router();
  const Product = require("../models/Product");
  
  // Add product (Admin only)
  router.post("/", async (req, res) => {
    try {
      const { name, description, price, image } = req.body;
      const newProduct = new Product({ name, description, price, image });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Edit product by ID (Admin only)
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
  
  // Delete product by ID (Admin only)
  router.delete("/:id", async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
});

module.exports = router;
