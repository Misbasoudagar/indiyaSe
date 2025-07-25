const Product = require('../models/Product');

// Helper function to add full image URL
const addImageUrl = (product, req) => {
  // Handle cases where image might be undefined
  const imagePath = product.image || '';
  
  // Only create full URL if we have a valid image path
  if (imagePath && imagePath.startsWith('/')) {
    return {
      ...product._doc ? product._doc : product,
      image: `${req.protocol}://${req.get('host')}${imagePath}`
    };
  }
  
  // Return product with original image value
  return {
    ...product._doc ? product._doc : product,
    image: imagePath
  };
};

exports.getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;
    const query = {};
    
    // Build query dynamically
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sorting
    const sortOptions = {};
    if (sort === 'price_asc') sortOptions.price = 1;
    if (sort === 'price_desc') sortOptions.price = -1;
    if (sort === 'newest') sortOptions.createdAt = -1;

    const products = await Product.find(query)
      .sort(sortOptions)
      .lean();

    // Add full URLs to images
    const productsWithUrls = products.map(product => 
      addImageUrl(product, req)
    );

    res.json({
      success: true,
      count: products.length,
      data: productsWithUrls
    });
  } catch (err) {
    console.error('❌ Error fetching products:', err.message, err.stack);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to retrieve products'
    });
  }
};

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
    console.error('❌ Error fetching product:', err.message, err.stack);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to retrieve product'
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    // Enhanced validation
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

    // Handle file upload presence
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      image: imagePath
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      data: addImageUrl(product, req)
    });
  } catch (err) {
    console.error('❌ Error creating product:', err.message, err.stack);
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        messages: errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to create product'
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updates = {
      ...req.body,
      ...(req.file && { image: `/uploads/${req.file.filename}` })
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
    console.error('❌ Error updating product:', err.message, err.stack);
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        messages: errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to update product'
    });
  }
};

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
    console.error('❌ Error deleting product:', err.message, err.stack);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to delete product'
    });
  }
};