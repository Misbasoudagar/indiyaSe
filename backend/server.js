require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const connectDB = require("./config/db");

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize Express App
const app = express();

// ✅ Import Category Routes AFTER app is defined
import categoryRoutes from './routes/categoryRoutes.js';

// ✅ CORS setup
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Route imports (CommonJS)
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const walletRoutes = require('./routes/walletRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const usersRoutes = require('./routes/userRoutes');
const sellerRoutes = require('./routes/sellerroutes');
const paymentRoutes = require('./routes/paymentRoutes');

// ✅ Mount routes
app.use('/api/categories', categoryRoutes);         console.log("✅ /api/categories loaded");
app.use('/api/auth', authRoutes);                   console.log("✅ /api/auth loaded");
app.use('/api/products', productRoutes);            console.log("✅ /api/products loaded");
app.use('/api/orders', orderRoutes);                console.log("✅ /api/orders loaded");
app.use('/api/wallet', walletRoutes);               console.log("✅ /api/wallet loaded");
app.use('/api/cart', cartRoutes);                   console.log("✅ /api/cart loaded");
app.use('/api/admin', adminRoutes);                 console.log("✅ /api/admin loaded");
app.use('/api/admin/orders', adminOrderRoutes);     console.log("✅ /api/admin/orders loaded");
app.use('/api/admin/users', usersRoutes);           console.log("✅ /api/admin/users loaded");
app.use('/api/users', usersRoutes);                 console.log("✅ /api/users loaded");
app.use('/api/sellers', sellerRoutes);              console.log("✅ /api/sellers loaded");
app.use('/api/payment', paymentRoutes);             console.log("✅ /api/payment loaded");
console.log("✅ /uploads static loaded");

// ✅ Default route
app.get("/", (req, res) => res.send("🚀 Indiyase API Running"));
app.get("/api", (req, res) => res.send("✅ Indiyase API is live"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
