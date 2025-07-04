import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products?category=${categoryName.toLowerCase()}`);
        console.log("Fetched products:", res.data, Array.isArray(res.data));
        setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
      } catch (err) {
        console.error("Failed to fetch category products:", err);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Category: {categoryName}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border p-2 rounded shadow">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <h3 className="font-semibold">{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
