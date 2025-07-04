import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gstOrUin: String,
  bankAccount: String,
  category: String,
  idProofUrl: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  reviewedBy: String,
  reviewedAt: Date
});

const Seller = mongoose.model('Seller', sellerSchema); // ✅ Capitalized model name
export default Seller; // ✅ Correct export
