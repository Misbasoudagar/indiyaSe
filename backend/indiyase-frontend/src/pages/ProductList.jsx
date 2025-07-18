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
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">IndiyaSe</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-100 rounded-md">UPLOAD PRESCRIPTION</button>
          <button className="px-4 py-2 bg-gray-100 rounded-md">BECOME A SELLER</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search products or say 'Hello'..." 
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 pr-6">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-bold mb-3">ALL HOME</h3>
            <ul className="space-y-2">
              {['WOMEN ETHNIC', 'WOMEN WESTERN', 'MENS WEAR', 'KIDS', 'ELECTRONICS', 'BEAUTY', 'GROCERY', 'HOME & KITCHEN', 'JEWELLERY'].map((cat) => (
                <li key={cat}>{cat}</li>
              ))}
            </ul>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <h3 className="font-bold mb-3">Filter:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✔️</span> Availability
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔️</span> Price
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔️</span> Color
              </li>
            </ul>
          </div>

          {/* Sale Items */}
          <div>
            <h3 className="font-bold mb-3">Side out</h3>
            <div className="space-y-4">
              <div className="bg-red-100 p-2 rounded">
                <p className="text-red-600 font-bold">-75% Off</p>
                <p className="text-sm">Gold Plain Palazzo Pants – Comfortable & Stylish Palazzo Literadora</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <span className="font-bold">Sort by:</span>
              <span className="flex items-center">
                <span className="mr-2">✔️</span> Alphabetically A-Z
              </span>
            </div>
            <div className="text-gray-500">{products.length} products</div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
            
            {/* Example additional product cards to match the image */}
            <div className="border p-3 rounded">
              <div className="bg-green-100 text-green-600 font-bold text-xs w-max px-1 mb-2">42% Off</div>
              <p className="text-sm mb-2">TRDOZZ Women's Stylish Rayon Cotton Loose Fit Palazzo Pants for Daily Wear and Girls Casual Elastic</p>
              <p className="font-bold">0.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500">
        <p>1355</p>
        <p>11-07-2023</p>
      </div>
    </div>
  );
};

export default ProductList;