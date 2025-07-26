const User = require("../models/userModel");

// @desc    Get all users and generate customerId if missing
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role isActive customerId");

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        if (!user.customerId) {
          // Generate customer ID using _id suffix
          const newCustomerId = `CUST${user._id.toString().slice(-6).toUpperCase()}`;
          user.customerId = newCustomerId;
          await user.save();
        }
        return user;
      })
    );

    res.status(200).json(updatedUsers);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = { getAllUsers };
