const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const upload = require("../middleware/multer");
const productController = require('../controllers/productController'); // Import controller

// Multer setup (should be in middleware/multer.js, not here)
// Remove this as it's already handled in your multer middleware file
// const storage = multer.diskStorage({...});

// POST create product
router.post("/", upload.single("image"), productController.createProduct);

// GET all products
router.get("/", productController.getAllProducts);

// 🚨 MISSING ENDPOINT - ADD THIS CRUCIAL ROUTE
// GET all products
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all products...'); // Debug log
    const products = await Product.find({});
    console.log(`Found ${products.length} products`); // Debug log
    res.json(products);
  } catch (err) {
    console.error('❌ GET /api/products error:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    // Add full URL to image if exists
    const productWithImageUrl = {
      ...product._doc,
      image: product.image ? `${req.protocol}://${req.get('host')}${product.image}` : null
    };
    
    res.json(productWithImageUrl);
  } catch (err) {
    console.error('❌ Product fetch error:', err.message);
    res.status(500).json({ 
      error: 'Internal server error',
      details: err.message 
    });
  }
});

// UPDATE product by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const updateData = {
      name,
      description,
      price,
      ...(req.file && { image: `/uploads/${req.file.filename}` })
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return updated product with full image URL
    const responseProduct = {
      ...updatedProduct._doc,
      image: updatedProduct.image 
        ? `${req.protocol}://${req.get('host')}${updatedProduct.image}` 
        : null
    };

    res.json(responseProduct);
  } catch (err) {
    console.error('❌ Product update error:', err.message);
    res.status(500).json({ 
      error: 'Internal server error',
      details: err.message 
    });
  }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('❌ Product deletion error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;