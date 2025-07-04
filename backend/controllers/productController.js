const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const category = req.query.category;
        let products;

        if (category) {
            products = await Product.find({ category });
        } else {
            products = await Product.find();
        }

        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
