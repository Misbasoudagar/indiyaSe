const express = require('express');
const Seller = require('../models/sellers');

const router = express.Router();

// Submit form
router.post('/submit', async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).json({ message: 'Submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sellers
router.get('/all', async (req, res) => {
  try {
    const sellers = await Seller.find().sort({ createdAt: -1 });
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve or reject seller
router.put('/status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await Seller.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: `Seller ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
