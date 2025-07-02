const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save address to user profile
// Save address to user profile (if not already saved)
router.put('/save-address/:email', async (req, res) => {
  const { name, phone, address, addressType } = req.body;

  try {
    const user = await User.findOne({ email: req.params.email });

    // Check if this address already exists
    const exists = user?.savedAddresses?.some((a) =>
      a.address === address &&
      a.phone === phone &&
      a.name === name &&
      a.addressType === addressType
    );

    if (exists) {
      return res.json({ message: 'Address already saved' });
    }

    const updated = await User.findOneAndUpdate(
      { email: req.params.email },
      {
        $push: {
          savedAddresses: { name, phone, address, addressType }
        }
      },
      { new: true }
    );

    res.json({ message: 'Address saved', user: updated });
  } catch (err) {
    console.error('❌ Failed to save address', err);
    res.status(500).json({ error: 'Server error' });
  }
});

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

// GET saved addresses by email
router.get('/addresses/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user?.savedAddresses || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load saved addresses' });
  }
});

module.exports = router;
