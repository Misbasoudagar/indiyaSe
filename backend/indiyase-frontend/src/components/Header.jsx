import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#faf5f1] to-[#f0e6d9] shadow-md py-4 sticky top-0 z-50 w-full">
      <div className="w-full px-4 mx-auto">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 w-full">
          {/* Logo - Left aligned */}
          <div className="flex items-center min-w-max">
            <img 
              src="/images/indiyase-logo.jpeg" 
              alt="Indiyase Logo" 
              className="h-12 w-auto rounded-lg shadow-sm hover:scale-105 transition-transform duration-200" 
            />
          </div>

          {/* Search */}
          <div className="flex-1 min-w-0">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for Products..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-orange-600">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* Buttons - Right */}
          <div className="flex flex-wrap gap-2 justify-start md:justify-end min-w-max">
            <Link to="/upload-prescription">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow hover:shadow-md transition-all hover:scale-105 whitespace-nowrap">
                <i className="fas fa-upload mr-1"></i> Upload Prescription
              </button>
            </Link>

            <Link to="/become-seller">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 md:px-4 md:py-2 rounded-full shadow hover:shadow-md transition-all hover:scale-105 whitespace-nowrap">
                <i className="fas fa-store mr-1"></i> Become a Seller
              </button>
            </Link>

            <Link to="/cart" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-800 transition-colors whitespace-nowrap">
              <i className="fas fa-shopping-cart"></i> <span>Cart</span>
            </Link>
            <Link to="/wallet" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-800 transition-colors whitespace-nowrap">
              <i className="fas fa-wallet"></i> <span className="hidden sm:inline">Wallet</span>
            </Link>
            <Link to="/orders" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-800 transition-colors whitespace-nowrap">
              <i className="fas fa-box"></i> <span className="hidden sm:inline">My Orders</span>
            </Link>
            <Link to="/register" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-800 transition-colors whitespace-nowrap">
              <i className="fas fa-sign-in-alt"></i> <span className="hidden sm:inline">Account</span>
            </Link>
            <a href="/logout" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-800 transition-colors whitespace-nowrap">
              <i className="fas fa-sign-out-alt"></i> <span className="hidden sm:inline">Logout</span>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex gap-4 md:gap-6 text-sm font-semibold text-gray-900 py-2 w-max mx-auto">
            {[
              'Home',
              'Women Ethnic',
              'Women Western',
              'Men Wears',
              'Kids',
              'Electronics',
              'Beauty',
              'Grocery',
              'Home & Kitchen',
              'Jewellery',
              'Footwears',
              'Books'
            ].map((item, i) => (
              <Link
                to={item === 'Home' ? '/' : `/category/${encodeURIComponent(item)}`}
                key={i}
                className="text-gray-900 hover:text-orange-600 transition-colors px-2 py-1 rounded-lg hover:bg-orange-50"
              >
                {item}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
