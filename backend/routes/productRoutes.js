const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const productController = require('../controllers/productController');

// ✅ GET all products
router.get("/", productController.getAllProducts);

// ✅ CREATE product (with image upload)
router.post("/", upload.single("image"), productController.createProduct);

// ✅ GET product by category
router.get('/category/:categoryName', productController.getProductsByCategory);

// ✅ GET product by ID
router.get('/:id', productController.getProductById);

// ✅ UPDATE product (with optional image upload)
router.put('/:id', upload.single("image"), productController.updateProduct);

// ✅ DELETE product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
