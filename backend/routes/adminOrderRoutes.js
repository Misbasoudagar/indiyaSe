const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel'); // assumes you have an Order model
const User = require('../models/userModel');

// GET all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();
    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

module.exports = router;