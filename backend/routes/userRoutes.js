const express = require('express');
const router = express.Router();
const User = require('../models/User');

// List Users
router.get('/', async (req, res) => { /* ... */ });

// Update role or active
router.put('/:id', async (req, res) => {
  const { role, isActive } = req.body;
  const updated = await User.findByIdAndUpdate(req.params.id,
    { role, isActive }, { new: true });
  res.json(updated);
});


// Update role or active
router.put('/:id', async (req, res) => {
  const { role, isActive } = req.body;
  const updated = await User.findByIdAndUpdate(req.params.id,
    { role, isActive }, { new: true });
  res.json(updated);
});


module.exports = router;
