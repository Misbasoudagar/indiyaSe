const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const productController = require('../controllers/productController');

// ✅ CREATE product (with image upload)
router.post("/", upload.single("image"), productController.createProduct);

// ✅ GET all products
router.get("/", productController.getAllProducts);

// ✅ GET product by category
router.get('/category/:categoryName', productController.getProductsByCategory);

// ✅ GET product by ID
router.get('/:id', productController.getProductById);

// ✅ UPDATE product by ID (with optional image upload)
router.put('/:id', upload.single("image"), productController.updateProduct);

// ✅ DELETE product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
