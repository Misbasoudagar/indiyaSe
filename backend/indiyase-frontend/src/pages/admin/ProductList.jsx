import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/api/products`);
      const data = response.data?.data || [];
      setProducts(data);
    } catch (err) {
      console.error("Fetch products error:", err);
      setError(err.response?.data?.message || err.message);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_BASE}/api/products/${id}`);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (err) {
        console.error("Delete product error:", err);
        toast.error(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error)
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );

  return (
    <div className="admin-product-container">
      <div className="product-list-header">
        <h2>Product List</h2>
        <Link to="/admin/add-product" className="add-product-link">
          <button className="add-btn">Add Product</button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <p>No products found</p>
          <Link to="/admin/add-product">Add your first product</Link>
        </div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>
                  {product.image ? (
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `${API_BASE}${product.image}`
                      }
                      alt={product.name}
                      className="product-img"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100";
                      }}
                    />
                  ) : (
                    <span style={{ color: "#888" }}>No Image</span>
                  )}
                </td>
                <td className="actions">
                  <Link to={`/admin/products/edit/${product._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
