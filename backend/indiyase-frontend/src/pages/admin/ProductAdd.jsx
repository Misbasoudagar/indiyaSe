import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", formData);
      alert("✅ Product added!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Failed to add product:", err);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>➕ Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label><br />
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description: </label><br />
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price (₹): </label><br />
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL: </label><br />
          <input name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductAdd;
