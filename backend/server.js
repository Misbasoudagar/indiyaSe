require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', require('./routes/orderRoutes'));

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parser with increased limits for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection with retry logic
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/indiyase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

// Routes
app.use('/api/products', require('./routes/productRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => { // Listen on all network interfaces
  console.log(`Server running on port ${PORT}`);
});