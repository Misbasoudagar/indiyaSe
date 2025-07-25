const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  wallet: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  customerId: {   // ✅ NEW
    type: String,
    unique: true
  }
}, {
  timestamps: true // ✅ Adds createdAt & updatedAt
});

// 🧠 Auto-generate customerId before saving
userSchema.pre('save', async function (next) {
  if (!this.customerId) {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    this.customerId = `CUST${randomId}`;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
