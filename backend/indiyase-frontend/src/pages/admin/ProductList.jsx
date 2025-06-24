import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch products", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("✅ Product deleted");
      fetchProducts(); // Refresh without reload
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("❌ Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Product Management</h2>

      <Link to="/admin/products/add">
        <button style={{ marginBottom: "20px" }}>➕ Add Product</button>
      </Link>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>🖼️ Image</th>
            <th>📛 Name</th>
            <th>📝 Description</th>
            <th>💰 Price</th>
            <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, idx) => (
            <tr key={prod._id}>
              <td>{idx + 1}</td>
              <td>
                <img src={prod.image} alt={prod.name} width="50" height="50" />
              </td>
              <td>{prod.name}</td>
              <td>{prod.description}</td>
              <td>₹{prod.price}</td>
              <td>
                <button onClick={() => navigate(`/admin/products/edit/${prod._id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  style={{ color: "red", marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
