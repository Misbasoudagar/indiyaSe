import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      console.log("Fetched product data:", data);

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.error("Unexpected product data format", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading products...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3>{product.title}</h3>
              <p>Price: ₹{product.price}</p>
              {product.image && (
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:5000/uploads/${product.image}`
                  }
                  alt={product.title}
                  style={{ width: "100%", height: "auto", marginTop: "0.5rem" }}
                />
              )}
              <Link to={`/product/${product._id}`}>
                <button style={{ marginTop: "0.5rem" }}>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
