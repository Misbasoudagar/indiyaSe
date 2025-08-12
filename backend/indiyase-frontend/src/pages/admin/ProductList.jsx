import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      const response = await axios.get(`${API_BASE}/api/products`);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];
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
      await axios.delete(`${API_BASE}/api/products/${id}`);
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
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-700 dark:text-gray-200">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-600 dark:text-red-400">
        <p className="mb-4">❌ Error: {error}</p>
        <button
          onClick={fetchProducts}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 w-full min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Product List</h2>
        <Link to="/admin/add-product">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
            Add Product
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
          <p className="mb-2">No products found</p>
          <Link to="/admin/add-product" className="text-blue-600 hover:underline">
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">#</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Image</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100">₹{product.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {product.image && (
                      <img
                        src={
                          product.image.startsWith("http")
                            ? product.image
                            : `${API_BASE}${product.image}`
                        }
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100";
                          e.target.onerror = null;
                        }}
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link to={`/admin/products/edit/${product._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
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
