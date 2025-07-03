import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    console.log("🛒 Product added:", product);
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
