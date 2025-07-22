import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
 // ✅ Make sure this file exists or comment this line

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        console.log("API response:", res.data);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected API response format:", res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      {loading ? (
        <>
          <div className="loading-placeholder" />
          <div className="loading-placeholder" />
          <div className="loading-placeholder" />
        </>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
