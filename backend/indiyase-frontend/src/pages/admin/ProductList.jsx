import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        alert("✅ Product deleted");
        fetchProducts(); // Refresh list
      } catch (err) {
        console.error("❌ Failed to delete product", err);
        alert("❌ Error deleting product");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Product List</h2>
      <Link to="/admin/add-product"><button>Add Product</button></Link>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={p._id}>
              <td>{idx + 1}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>₹{p.price}</td>
              <td>{p.image ? <img src={p.image} alt="img" width="50" /> : "No image"}</td>
              <td>
                <Link to={`/admin/edit-product/${p._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
