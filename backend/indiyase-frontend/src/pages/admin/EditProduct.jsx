import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      console.error('❌ Failed to update product:', err);
      alert('❌ Error updating product');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          /><br />
        </div>

        <div>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          /><br />
        </div>

        <div>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            required
          /><br />
        </div>

        <div>
          {product.image && (
            <img
              src={`http://localhost:5000${product.image}`}
              alt="Current"
              width="80"
              style={{ marginBottom: '10px' }}
            />
          )}
          <br />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          /><br />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
