require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const path = require("path");
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB(); // ✅ Only one connection
const app = express(); // 🔴 This line MUST come BEFORE route mounting





// CORS setup
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// =======================
// 🔍 Debug route loading
// =======================
console.log("🔁 Mounting Routes...");

try {
  app.use('/api/auth', require('./routes/authRoutes')); console.log("✅ /api/auth loaded");
  app.use('/api/products', require('./routes/productRoutes')); console.log("✅ /api/products loaded");
  app.use('/api/orders', require('./routes/orderRoutes')); console.log("✅ /api/orders loaded");
  app.use('/api/wallet', require('./routes/walletRoutes')); console.log("✅ /api/wallet loaded");
  app.use('/api/cart', require('./routes/cartRoutes')); console.log("✅ /api/cart loaded");
  app.use('/api/admin', require('./routes/adminRoutes')); console.log("✅ /api/admin loaded");
  app.use('/api/admin/orders', require('./routes/adminOrderRoutes')); console.log("✅ /api/admin/orders loaded");
  app.use('/api/admin/users', require('./routes/adminUserRoutes')); console.log("✅ /api/admin/users loaded");
  app.use('/api/users', require('./routes/userRoutes')); console.log("✅ /api/users loaded");
  app.use('/api/sellers', require('./routes/sellerroutes')); console.log("✅ /api/sellers loaded");
  app.use('/api/payment', require('./routes/paymentRoutes')); console.log("✅ /api/payment loaded");
   console.log("✅ /uploads static loaded");
} catch (err) {
  console.error("❌ Crash while loading route:", err);
  process.exit(1);
}

// Default Routes
app.get("/", (req, res) => res.send("🚀 Indiyase API Running"));
app.get("/api", (req, res) => res.send("✅ Indiyase API is live"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
