import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductCategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products?category=${categoryName}`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-2">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="font-semibold">{product.name}</h3>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryPage;
