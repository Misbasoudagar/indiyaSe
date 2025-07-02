// models/orderModel.js

const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true
  },

  address: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Pending", // or "Processing", "Shipped", etc.
  }
  
});

module.exports = mongoose.model('Order', orderSchema);
