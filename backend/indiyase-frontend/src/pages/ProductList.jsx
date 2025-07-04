import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = category
        ? `http://localhost:5000/api/products?category=${category}`
        : 'http://localhost:5000/api/products';
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Product fetch error:', err);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
