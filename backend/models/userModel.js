const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  savedAddresses: [
    {
      address: String,
      addressType: String,
      phone: String,
      name: String
    }
  ]
});

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
