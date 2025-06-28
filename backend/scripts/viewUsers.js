const mongoose = require("mongoose");
const User = require("../models/userModel"); // adjust path if needed

mongoose.connect("mongodb://127.0.0.1:27017/indiyaSe")
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const users = await User.find({});
    console.log(`👥 Found ${users.length} users:\n`);

    users.forEach((user, index) => {
      console.log(`🟢 User ${index + 1}`);
      console.log(`   ID:        ${user._id}`);
      console.log(`   Name:      ${user.name || "(no name)"}`);
      console.log(`   Email:     ${user.email || "(no email)"}`);
      console.log(`   Role:      ${user.role}`);
      console.log(`   Active:    ${user.isActive}`);
      console.log("--------------------------------------------------");
    });

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error fetching users:", err);
  });

  