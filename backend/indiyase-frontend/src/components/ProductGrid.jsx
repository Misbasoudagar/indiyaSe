const products = [
    { name: 'Pink Saree', discount: 65, img: '/assets/pink.jpg' },
    { name: 'Purple Suit', discount: 21, img: '/assets/purple.jpg' },
    { name: 'Red Suit', discount: 11, img: '/assets/red.jpg' },
    { name: 'Black Dress', discount: 24, img: '/assets/black.jpg' },
    { name: 'Pastel Saree', discount: 61, img: '/assets/pastel.jpg' },
  ];
  
  const ProductGrid = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-50">
        {products.map((item, i) => (
          <div key={i} className="relative border rounded overflow-hidden">
            <img src={item.img} alt={item.name} className="w-full h-64 object-cover" />
            <span className="absolute bottom-2 left-2 bg-black text-white px-2 text-xs rounded">
              -{item.discount}% Off
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductGrid;
  