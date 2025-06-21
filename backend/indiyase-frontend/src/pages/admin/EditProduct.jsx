import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams(); // get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    // Fetch existing product details
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch product:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/products/${id}`, product)
      .then(() => {
        alert('Product updated successfully!');
        navigate('/admin/products'); // go back to product list
      })
      .catch(err => {
        console.error('Failed to update product:', err);
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
        /><br />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        /><br />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
        /><br />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
