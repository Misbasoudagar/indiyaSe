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

  // Mock API function (replace with real API call)
  const mockApiCall = (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form data to submit:', {
          name: formData.get('name'),
          description: formData.get('description'),
          price: formData.get('price'),
          category: formData.get('category'),
          image: formData.get('image') ? formData.get('image').name : null
        });
        resolve({ status: 201, data: { message: 'Product created successfully!' } });
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    // Validation
    if (!product.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (product.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      if (imageFile) formData.append('image', imageFile);

      // REAL API CALL (uncomment when backend is ready)
      // const response = await axios.post('http://localhost:5000/api/products', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

      // MOCK API CALL (remove when using real API)
      const response = await mockApiCall(formData);

      toast.success(response.data.message);
      setProduct({
        name: '',
        description: '',
        price: '',
        category: 'Women Ethnic'
      });
      setImageFile(null);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 
                     err.message || 
                     'Failed to add product';
      toast.error(errorMsg);
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '20px auto', 
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Product</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Product Name</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({...product, name: e.target.value})}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Price ($)</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({...product, price: e.target.value})}
            style={{ width: '100%', padding: '8px' }}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {imageFile && (
            <div style={{ marginTop: '5px', fontSize: '14px' }}>
              Selected: {imageFile.name}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea
            value={product.description}
            onChange={(e) => setProduct({...product, description: e.target.value})}
            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Category</label>
          <select
            value={product.category}
            onChange={(e) => setProduct({...product, category: e.target.value})}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="Women Ethnic">Women Ethnic</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px',
            background: isSubmitting ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;