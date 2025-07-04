
const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

// =====================================
// ✅ MIDDLEWARES
// =====================================

// Enable CORS for frontend at port 5173
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight support

// Parse incoming JSON requests
app.use(express.json());

// =====================================
// ✅ ROUTES
// =====================================

// Import route modules
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const walletRoutes = require('./routes/walletRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const userRoutes = require('./routes/userRoutes');
const sellerRoutes = require('./routes/sellerroutes');



// Mount routes with prefixes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);

// =====================================
// ✅ DATABASE CONNECTION
// =====================================

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/indiyase";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// =====================================
// ✅ BASIC ROUTES
// =====================================

app.get("/", (req, res) => {
  res.send("🚀 Indiyase API Running");
});

app.get("/api", (req, res) => {
  res.send("✅ Indiyase API is live");
});

// =====================================
// ✅ START SERVER
// =====================================

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
