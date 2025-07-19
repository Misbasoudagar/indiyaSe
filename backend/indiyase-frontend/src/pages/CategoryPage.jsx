import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import WalletSidebar from '../components/WalletSidebar';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products?category=${category}`);
      setProducts(res.data.products || []); // ✅ safe extraction

    } catch (err) {
      console.error("Error loading category products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  return (
    <div>
      <Navbar />
      <div className="pt-4 px-4">
        <h2 className="text-2xl font-bold mb-4">Category: {decodeURIComponent(category)}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-orange-600 font-bold">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <WalletSidebar />
    </div>
  );
};

export default CategoryPage;
