const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const productController = require('../controllers/productController');

// ✅ Create a new product
router.post("/", upload.single("image"), productController.createProduct);

// ✅ Get all products
router.get("/", productController.getAllProducts);

// ✅ Get a single product by ID
router.get('/:id', productController.getProductById);

// ✅ Update product by ID
router.put('/:id', upload.single('image'), productController.updateProduct);

// ✅ Delete product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
