import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Women Ethnic'
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      if (imageFile) formData.append('image', imageFile);

      await axios.post(`${API_BASE_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 10000 // 10 second timeout
      });

      toast.success('Product added successfully!');
      // Reset form
      setProduct({
        name: '',
        description: '',
        price: '',
        category: 'Women Ethnic'
      });
      setImageFile(null);
    } catch (err) {
      console.error('Add Product Error:', err);
      const errorMessage = err.response?.data?.message || 
                         (err.code === 'ECONNABORTED' ? 'Request timed out' : 
                         err.message.includes('Network Error') ? 'Cannot connect to server' : 
                         'Failed to add product');
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form">
      {/* Your existing form JSX */}
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;