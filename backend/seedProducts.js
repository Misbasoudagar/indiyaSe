const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");
const connectDB = require("./config/db");
dotenv.config();

const products = [
  {
    name: "Sample Product 1",
    description: "This is the first sample product.",
    price: 199,
    image: "/uploads/sample1.jpg",
  },
  {
    name: "Sample Product 2",
    description: "This is the second sample product.",
    price: 299,
    image: "/uploads/sample2.jpg",
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedProducts();