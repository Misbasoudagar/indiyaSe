const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  customerId: {
    type: String,
    unique: true,
    sparse: true // Allows multiple nulls until assigned
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

  savedAddresses: [
    {
      address: String,
      addressType: String,
      phone: String,
      name: String
    }
  ]
}, { timestamps: true });

// ✅ Prevent OverwriteModelError during dev/watch
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
