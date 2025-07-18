const subcategories = [
    { name: 'kurtis', img: '/assets/kurtis.jpg' },
    { name: 'sarees', img: '/assets/sarees.jpg' },
    { name: 'Sets & Suits', img: '/assets/sets.jpg' },
    { name: 'Lehenga', img: '/assets/lehenga.jpg' },
    { name: 'Other Ethnic', img: '/assets/other.jpg' },
  ];
  
  const SubCategoryCarousel = () => {
    return (
      <div className="flex gap-4 overflow-x-auto p-4 bg-white">
        {subcategories.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center w-24">
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 rounded-full object-cover border"
            />
            <span className="text-sm text-center mt-2">{item.name}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default SubCategoryCarousel;
  