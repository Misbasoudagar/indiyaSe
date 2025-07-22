const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const productController = require('../controllers/productController'); // Import controller

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
router.get('/:id', productController.getProductById);

// UPDATE product by ID
router.put('/:id', upload.single('image'), productController.updateProduct);

// DELETE product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;