const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // or "admin"
  isActive: { type: Boolean, default: true },
  wallet: { type: Number, default: 0 }
});

// Fix for OverwriteModelError when using nodemon
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
