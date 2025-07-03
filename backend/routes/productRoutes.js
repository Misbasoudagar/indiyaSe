const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category: category.toLowerCase() } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Get all products (with optional limit + filters)
// ✅ Filterable GET route
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

// ✅ Updated Seed route with category
router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany([
      {
        name: "Ayurvedic Syrup",
        description: "Natural immune booster",
        price: 250,
        image: "",
        category: "medicine"
      },
      {
        name: "Herbal Soap",
        description: "Chemical-free skincare",
        price: 90,
        image: "",
        category: "wellness"
      }
    ]);
    res.send("Dummy products seeded");
  } catch (err) {
    res.status(500).json({ message: "Seeding failed", error: err.message });
  }
});


// ✅ Add product manually
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const product = new Product({ name, description, price, image, category });
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
        category: "medicine",
        image: ""
      },
      {
        name: "Herbal Soap",
        description: "Chemical-free skincare",
        price: 90,
        category: "wellness",
        image: ""
      }
    ]);
    res.send("Dummy products seeded");
  } catch (err) {
    res.status(500).json({ message: "Seeding failed", error: err.message });
  }
});

module.exports = router;
