import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>📦 All Products</h2>
      <Link to="/admin/add-product">
        <button>Add Product</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>📌 Name</th>
            <th>📝 Description</th>
            <th>💰 Price</th>
            <th>🖼️ Image</th>
            <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>₹{p.price}</td>
              <td>
                {p.image ? (
                  <img src={p.image} alt={p.name} width="50" />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <Link to={`/admin/edit-product/${p._id}`}>
                  <button>Edit</button>
                </Link>
                {/* You can add delete button here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
