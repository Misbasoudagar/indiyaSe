const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Save or update cart
router.post("/save", async (req, res) => {
    const { userId, items } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            cart.items = items;
            await cart.save();
        } else {
            cart = new Cart({ userId, items });
            await cart.save();
        }
        res.json({ message: "Cart saved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get cart
router.get("/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.json(cart || { items: [] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
