const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount, name, email, phone } = req.body;

  const options = {
    amount: amount * 100, // paise
    currency: "INR",
    receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    notes: {
      name,
      email,
      phone,
    },
    callback_url: `${process.env.FRONTEND_URL}/thankyou`, // after payment redirect
  };

  try {
    const order = await instance.orders.create(options);
    res.json({ id: order.id });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
