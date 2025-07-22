const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('❌ Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ Update user role or active status
router.put('/:id', async (req, res) => {
  const { role, isActive } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role, isActive },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('❌ Failed to update user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// ✅ Save new address to user profile
router.put('/save-address/:email', async (req, res) => {
  const { name, phone, address, addressType } = req.body;

  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const exists = user.savedAddresses?.some(a =>
      a.name === name &&
      a.phone === phone &&
      a.address === address &&
      a.addressType === addressType
    );

    if (exists) {
      return res.json({ message: 'Address already saved' });
    }

    user.savedAddresses.push({ name, phone, address, addressType });
    await user.save();

    res.json({ message: 'Address saved successfully', user });
  } catch (err) {
    console.error('❌ Failed to save address:', err);
    res.status(500).json({ error: 'Server error while saving address' });
  }
});

// ✅ Get saved addresses by email
router.get('/addresses/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.savedAddresses || []);
  } catch (err) {
    console.error('❌ Failed to fetch addresses:', err);
    res.status(500).json({ error: 'Failed to load saved addresses' });
  }
});

module.exports = router;
