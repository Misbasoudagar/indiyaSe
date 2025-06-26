const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet");


// GET all wallets
router.get("/", async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wallets" });
  }
});

// PUT /api/wallet/:email/update
router.put("/:email/update", async (req, res) => {
  try {
    const { email } = req.params;
    const { amount } = req.body;

    let wallet = await Wallet.findOne({ email });
    if (!wallet) {
      wallet = new Wallet({ email, balance: amount });
    } else {
      wallet.balance += amount;
    }

    await wallet.save();
    res.json({ message: "Wallet updated", balance: wallet.balance });
  } catch (err) {
    res.status(400).json({ message: "Failed to update wallet", error: err.message });
  }
});

// GET /api/wallet - Admin fetch all wallets
router.get("/", async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wallets" });
  }
});
// TEMP: Seed a test wallet (use only for development)
router.post("/seed", async (req, res) => {
  try {
    await Wallet.deleteMany({});
    await Wallet.create({ email: "demo@example.com", balance: 500 });
    res.send("✅ Wallet seeded");
  } catch (err) {
    res.status(500).json({ message: "❌ Seeding failed", error: err.message });
  }
});



// PUT /api/wallet/:email/update
router.put("/:email/update", async (req, res) => {
    const { email } = req.params;
    const { amount } = req.body;
  
    try {
      const wallet = await Wallet.findOne({ userEmail: email });
  
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
  
      wallet.balance += amount; // Use negative value to deduct
      await wallet.save();
  
      res.json({ message: "✅ Wallet updated", balance: wallet.balance });
    } catch (err) {
      console.error("❌ Error updating wallet", err);
      res.status(500).json({ message: "Failed to update wallet" });
    }
  });
  
  module.exports = router;