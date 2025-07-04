import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const user = state.user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const categories = [
    "Women Ethnic",
    "Women Western",
    "Men Wears",
    "Kids",
    "Electronics",
    "Beauty",
    "Grocery",
    "Home & Kitchen",
    "Jewellery",
    "Footwears",
    "Books",
  ];

  return (
    <>
      {/* Top Navigation */}
      <nav className="bg-blue-600 text-white p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">IndiyaSe</Link>
        </div>
        <div className="flex gap-4 items-center mt-2 md:mt-0 flex-wrap justify-center">
          <Link to="/">Home</Link>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>{" "}
            <span>Cart ({cart.length})</span>
          </Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/wallet">Wallet</Link>

          {user ? (
            <>
              <span className="text-sm">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-2 py-1 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      {/* Scrollable Category Navigation */}
      <nav className="mt-2 w-full overflow-x-auto whitespace-nowrap scrollbar-hide bg-orange-50 shadow-sm">
        <div className="flex gap-4 md:gap-6 text-sm font-semibold text-gray-900 py-2 px-4 w-max mx-auto">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/category/${encodeURIComponent(cat)}`}
              className="text-gray-900 hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-orange-200"
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
