const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Optional if you're using auth
const Order = require('../models/orderModel');
const sendEmail = require('../utils/sendEmail'); // 👈 Utility to send email

// ==========================
// 🔐 USER: Get My Orders (Protected)
// ==========================
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.user.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load orders', error: error.message });
  }
});

// ==========================
// 🧾 USER: Place New Order
// ==========================
router.post("/", async (req, res) => {
  try {
    const { products, address, userEmail, totalAmount, status = "Pending", fullName } = req.body;

    // ✅ Validation
    if (!products || !address || !userEmail || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Create and Save Order
    const newOrder = new Order({
      products,
      address,
      userEmail,
      totalAmount,
      status,
    });

    const savedOrder = await newOrder.save();

    // ✅ Generate order ID snippet
    const orderIdShort = savedOrder._id.toString().slice(-6).toUpperCase();

    // ✅ Email content
    const html = `
      <h2 style="color:#0f172a;">Order Confirmed</h2>
      <p><strong>Confirmation #ORDER${orderIdShort}</strong></p>

      <p>Thank you, <strong>${fullName || 'Customer'}</strong>!</p>
      <p>Your order has been placed successfully.</p>

      <h3>📦 Shipping Address</h3>
      <p>${address.name || fullName || ''}</p>
      <p>${address.address}</p>
      <p>${address.city}, ${address.state} - ${address.pinCode}</p>
      <p>Phone: ${address.phone}</p>
      <p>Email: ${userEmail}</p>

      <h3>💳 Payment Summary</h3>
      <p>Payment Method: ${status === 'Paid' ? 'Razorpay' : 'Cash on Delivery'}</p>
      <p>Subtotal: ₹${totalAmount}</p>
      <p>Delivery Charges: FREE</p>
      <p><strong>Total: ₹${totalAmount}</strong></p>

      <br/>
      <a href="https://www.indiyase.in" style="background-color:#0f172a;color:#fff;padding:10px 20px;text-decoration:none;border-radius:4px;">Continue Shopping</a>

      <p style="font-size:12px;color:gray;">© ${new Date().getFullYear()} Indiyase. All rights reserved.</p>
    `;

    // ✅ Send email
    await sendEmail({
      to: userEmail,
      subject: `Order Confirmation - Indiyase`,
      html,
    });

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Order save or email send failed:", err.message);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
});

module.exports = router;
