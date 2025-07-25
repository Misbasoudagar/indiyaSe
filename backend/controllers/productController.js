const Product = require('../models/Product');

// 🔧 Helper: Add full image URL
const addImageUrl = (product, req) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const image = product.image || '';

  return {
    ...('_doc' in product ? product._doc : product),
    image: image.startsWith('/') ? `${baseUrl}${image}` : image
  };
};

// ✅ GET all products (with filters & sorting)
exports.getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;
    const query = {};

    // ✅ Case-insensitive category match (fix for frontend query mismatch)
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') }; 
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortOptions = {};
    if (sort === 'price_asc') sortOptions.price = 1;
    else if (sort === 'price_desc') sortOptions.price = -1;
    else if (sort === 'newest') sortOptions.createdAt = -1;

    const products = await Product.find(query).sort(sortOptions).lean();
    const productsWithUrls = products.map(p => addImageUrl(p, req));

    res.json({
      success: true,
      count: productsWithUrls.length,
      data: productsWithUrls
    });
  } catch (err) {
    console.error('❌ Error fetching products:', err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to retrieve products'
    });
  }
};

// ✅ GET product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: addImageUrl(product, req)
    });
  } catch (err) {
    console.error('❌ Error fetching product:', err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to retrieve product'
    });
  }
};

// ✅ CREATE product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['name', 'price', 'category']
      });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Price must be a positive number'
      });
    }

    const imagePath = req.file
  ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  : null;

const product = await Product.create({
  name,
  description,
  price: Number(price),
  category,
  image: imagePath // ✅ Now full URL saved in DB
});


    res.status(201).json({
      success: true,
      data: addImageUrl(product, req)
    });
  } catch (err) {
    console.error('❌ Error creating product:', err.message);

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to create product'
    });
  }
};

// ✅ UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const updates = {
      ...req.body,
      ...(req.file && { image: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` })
    };

    if (updates.price) updates.price = Number(updates.price);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: addImageUrl(product, req)
    });
  } catch (err) {
    console.error('❌ Error updating product:', err.message);

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to update product'
    });
  }
};

// ✅ DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('❌ Error deleting product:', err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to delete product'
    });
  }
};
// ✅ GET products by category (separate API)
exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const products = await Product.find({
      category: { $regex: new RegExp(`^${categoryName}$`, 'i') } // case-insensitive match
    }).lean();

    const productsWithUrls = products.map(p => addImageUrl(p, req));

    res.json({
      success: true,
      count: productsWithUrls.length,
      data: productsWithUrls
    });
  } catch (err) {
    console.error('❌ Error fetching products by category:', err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to retrieve category products'
    });
  }
};
