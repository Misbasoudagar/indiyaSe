require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const path = require("path");
const authRoutes = require('./routes/auth');


dotenv.config();
connectDB(); // ✅ Connect to MongoDB

const app = express();

// ✅ CORS setup
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// ✅ Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const walletRoutes = require('./routes/walletRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
// const adminUserRoutes = require('./routes/adminUserRoutes'); ❌ Removed or comment out
const usersRoutes = require('./routes/userRoutes');
const sellerRoutes = require('./routes/sellerroutes');
const paymentRoutes = require('./routes/paymentRoutes');

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
// ❌ Removed buggy adminUserRoutes mount
// app.use('/api/admin', require('./routes/adminUserRoutes')); 
app.use('/api/admin/users', usersRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);


// ✅ Default routes
app.get("/", (req, res) => res.send("🚀 Indiyase API Running"));
app.get("/api", (req, res) => res.send("✅ Indiyase API is live"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
