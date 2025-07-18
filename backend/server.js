require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Database Connection
connectDB(); // Uses connection from config/db.js

// CORS Configuration - Updated for better security
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight requests

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files - Updated for better path handling
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes - Organized and documented
const apiRoutes = [
  { path: '/api/auth', route: require('./routes/authRoutes') },
  { path: '/api/products', route: require('./routes/productRoutes') },
  { path: '/api/orders', route: require('./routes/orderRoutes') },
  { path: '/api/wallet', route: require('./routes/walletRoutes') },
  { path: '/api/cart', route: require('./routes/cartRoutes') },
  { path: '/api/admin', route: require('./routes/adminRoutes') },
  { path: '/api/admin/orders', route: require('./routes/adminOrderRoutes') },
  { path: '/api/admin/users', route: require('./routes/adminUserRoutes') },
  { path: '/api/users', route: require('./routes/userRoutes') },
  { path: '/api/seller', route: require('./routes/sellerRoutes') },
  { path: '/api/payment', route: require('./routes/paymentRoutes') }
];

// Register all routes
apiRoutes.forEach(({ path, route }) => {
  app.use(path, route);
  console.log(`Registered route: ${path}`);
});

// Health Check Endpoints
app.get('/', (req, res) => res.status(200).json({ 
  status: 'success',
  message: '🚀 Indiyase API Running',
  timestamp: new Date()
}));

app.get('/api/health', (req, res) => res.status(200).json({
  status: 'success',
  database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  timestamp: new Date()
}));

// Error Handling Middleware - Added proper error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 Handler - Added to catch undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    requestedUrl: req.originalUrl
  });
});

// Server Configuration
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;