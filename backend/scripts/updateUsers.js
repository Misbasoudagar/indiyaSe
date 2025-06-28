const mongoose = require("mongoose");
const User = require("../models/userModel"); // adjust path if needed

mongoose.connect("mongodb://127.0.0.1:27017/indiyaSe", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ Connected to MongoDB");

  const result = await User.updateMany(
    {},
    { $set: { role: "user", isActive: true } }
  );

  console.log(`✅ Updated ${result.modifiedCount} users.`);
  mongoose.disconnect();
})
.catch((err) => {
  console.error("❌ Failed to update users:", err);
});
