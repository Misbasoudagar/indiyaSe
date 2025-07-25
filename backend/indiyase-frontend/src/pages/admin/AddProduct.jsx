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
        navigate('/admin/products'); // Redirect to Product List page
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
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '1rem' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
        <select name="category" value={product.category} onChange={handleChange}>
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
