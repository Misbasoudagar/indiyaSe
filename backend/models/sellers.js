const mongoose = require('mongoose');

const sellerRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gstOrUin: String,
  bankAccount: String,
  category: String,
  idProofUrl: String, // Will hold uploaded document link
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  reviewedBy: String,
  reviewedAt: Date
});

module.exports = mongoose.model('SellerRequest', sellerRequestSchema);
