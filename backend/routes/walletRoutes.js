const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet");

// GET /api/wallet - Admin fetch all wallets
router.get("/", async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wallets" });
  }
});

module.exports = router;
