import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get token from localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const response = await axios.get(`${API_BASE}/api/products`, config);

      const data = Array.isArray(response.data)
      ? response.data
      : response.data.data || []; // <- Correct key here
    

      setProducts(data);
    } catch (err) {
      console.error("Fetch products error:", err);
      setError(err.response?.data?.message || err.message);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeletingId(id);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axios.delete(`${API_BASE}/api/products/${id}`, config);
      toast.success("Product deleted successfully");
      await fetchProducts();
    } catch (err) {
      console.error("Delete product error:", err);
      toast.error(err.response?.data?.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading && products.length === 0) {
    return <div className="loading-spinner">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={fetchProducts} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

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
        <div className="table-responsive">
          <table className="product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price.toLocaleString()}</td>
                  <td>
                    {product.image && (
                      <img
                        src={
                          product.image.startsWith("http")
                            ? product.image
                            : `${API_BASE}${product.image}`
                        }
                        alt={product.name}
                        className="product-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100";
                          e.target.onerror = null;
                        }}
                      />
                    )}
                  </td>
                  <td className="actions">
                    <Link to={`/admin/products/edit/${product._id}`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                    >
                      {deletingId === product._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
