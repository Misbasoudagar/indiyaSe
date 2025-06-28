const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet");

// ✅ TEMP GET /api/wallet/my (for testing frontend without auth)
router.get('/my', (req, res) => {
  res.json({
    balance: 500,
    transactions: [
      { amount: 50, description: 'Order #123 Cashback', date: new Date() },
      { amount: 100, description: 'Wallet Top-up', date: new Date() },
    ],
  });
});

// ✅ GET all wallets (Admin)
router.get("/", async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wallets" });
  }
});

// ✅ PUT /api/wallet/:email/update - Update wallet balance (add/deduct)
router.put("/:email/update", async (req, res) => {
  const { email } = req.params;
  const { amount } = req.body;

  try {
    let wallet = await Wallet.findOne({ email }); // or use `userEmail` depending on model

    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = new Wallet({ email, balance: amount });
    } else {
      wallet.balance += amount;
    }

    await wallet.save();
    res.json({ message: "✅ Wallet updated", balance: wallet.balance });
  } catch (err) {
    console.error("❌ Error updating wallet", err);
    res.status(500).json({ message: "Failed to update wallet", error: err.message });
  }
});

// ✅ POST /api/wallet/seed - Seed a test wallet (development only)
router.post("/seed", async (req, res) => {
  try {
    await Wallet.deleteMany({});
    await Wallet.create({ email: "demo@example.com", balance: 500 });
    res.send("✅ Wallet seeded");
  } catch (err) {
    res.status(500).json({ message: "❌ Seeding failed", error: err.message });
  }
});

module.exports = router;
