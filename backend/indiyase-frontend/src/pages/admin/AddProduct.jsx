import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Women Ethnic',
  });

  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) formData.append('image', imageFile);

      await axios.post(`${API_BASE_URL}/api/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('✅ Product added successfully!');
      setProduct({ name: '', description: '', price: '', category: 'Women Ethnic' });
      setImageFile(null);

      setTimeout(() => {
        navigate('/admin/products');
      }, 1000);
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || '❌ Failed to add product';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="Women Ethnic">Women Ethnic</option>
            <option value="Women Western">Women Western</option>
            <option value="Men Wears">Men Wears</option>
            <option value="Kids">Kids</option>
            <option value="Electronics">Electronics</option>
            <option value="Beauty">Beauty</option>
            <option value="Grocery">Grocery</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Footwears">Footwears</option>
            <option value="Books">Books</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-2 dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
