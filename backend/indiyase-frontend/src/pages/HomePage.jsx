import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔵 HEADER - Full width with contained content */}
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

            {/* Search - Takes available space */}
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

            {/* Buttons - Right aligned on desktop */}
            <div className="flex flex-wrap gap-2 justify-start md:justify-end min-w-max">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow hover:shadow-md transition-all hover:scale-105 whitespace-nowrap">
                <i className="fas fa-upload mr-1"></i> Upload Prescription
              </button>
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 md:px-4 md:py-2 rounded-full shadow hover:shadow-md transition-all hover:scale-105 whitespace-nowrap">
                <i className="fas fa-store mr-1"></i> Become a Seller
              </button>
              <Link to="/cart" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-800 transition-colors whitespace-nowrap">
  <i className="fas fa-shopping-cart"></i> <span>Cart</span>
</Link>
<Link to="/wallet" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-black-800 transition-colors whitespace-nowrap">
  <i className="fas fa-wallet"></i> <span className="hidden sm:inline">Wallet</span>
</Link>
<Link to="/orders" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-black-800 transition-colors whitespace-nowrap">
  <i className="fas fa-box"></i> <span className="hidden sm:inline">My Orders</span>
</Link>
<Link to="/Register" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-black-800 transition-colors whitespace-nowrap">
  <i className="fas fa-sign-in-alt"></i> <span className="hidden sm:inline">Account</span>
</Link>
              <a href="/logout" className="bg-black text-white px-3 py-1 md:py-2 rounded-full text-sm flex items-center gap-1 hover:bg-black-800 transition-colors whitespace-nowrap">
                <i className="fas fa-sign-out-alt"></i> <span className="hidden sm:inline">Logout</span>
              </a>
            </div>
          </div>

         {/* Navigation - Full width scrollable */}
<nav className="mt-4 w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
  <div className="flex gap-4 md:gap-6 text-sm font-semibold text-gray-900 py-2 w-max mx-auto">
    {['Home', 'Women Ethnic', 'Women Western', 'Men Wears', 'Kids', 'Electronics', 'Beauty', 'Grocery', 'Home & Kitchen', 'Jewellery', 'Footwears', 'Books'].map((item, i) => (
      <a 
        href="#" 
        key={i} 
        className="text-gray-900 hover:text-orange-600 transition-colors px-2 py-1 rounded-lg hover:bg-orange-50"
      >
        {item}
      </a>
    ))}
  </div>
</nav>
        </div>
      </header>

      {/* 🔵 BANNER - Full width */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/womensaree.jpeg')` }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-center px-4 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Welcome to Indiyase</h1>
            <p className="text-lg md:text-xl text-white mb-6 drop-shadow-md">Your one-stop shop for medicines, fashion & more</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-full shadow-lg transition-all transform hover:scale-105">
              Shop Now
            </button>
            
            {/* Divider */}
            <div className="w-20 h-1 bg-white mx-auto my-6"></div>
            
            {/* Promo Badge */}
            <div className="inline-block bg-white bg-opacity-90 text-red-600 px-4 py-1 rounded-full text-sm font-bold mb-4">
              FIRST TIME IN THE WORLD - FREE
            </div>
            
            {/* Medicine Count */}
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">1,800+</div>
            <div className="text-xl md:text-2xl text-white uppercase tracking-wider">
              GENERIC MEDICINES
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - Contained width */}
      <main className="flex-grow w-full px-4 py-6 md:py-10">
        {/* PROMO SECTION */}
        <section className="w-full bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl shadow-lg p-6 md:p-8 mb-8 md:mb-10 text-center border border-gray-100">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-gray-800">HOW TO GET MEDICINES FREE FOREVER?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {text: "Buy anything from Indiyase", icon: "fa-shopping-bag"},
              {text: "Get 60% Cashback", icon: "fa-rupee-sign"},
              {text: "Upload Prescription", icon: "fa-file-medical"},
              {text: "Receive Free Medicines", icon: "fa-pills"}
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <i className={`fas ${item.icon} text-sm md:text-lg`}></i>
                </div>
                <div className="text-base md:text-lg font-medium text-gray-700">{item.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MONTHLY OFFER SECTION */}
        <section className="w-full bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-lg p-6 md:p-8 mb-8 md:mb-10 text-center border border-red-100">
          <div className="flex justify-center items-center mb-3 md:mb-4">
            <i className="fas fa-gift text-2xl md:text-3xl text-red-500 mr-2 md:mr-3"></i>
            <h4 className="text-lg md:text-xl font-bold text-red-600">📦 EVERY MONTH OFFER</h4>
          </div>
          <p className="text-gray-700 text-base md:text-lg">
            Diabetes & Blood Pressure patients can get Generic Medicines <span className="font-bold text-red-600">FREE</span> every month!
          </p>
          <button className="mt-4 md:mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 md:py-2 md:px-6 rounded-full shadow transition-all">
            Learn More
          </button>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="w-full mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-orange-800 mb-4 md:mb-6 text-center">Shop by Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              {name: "Medicines", icon: "fa-pills", color: "bg-blue-100 text-blue-600"},
              {name: "Women's Wear", icon: "fa-tshirt", color: "bg-pink-100 text-pink-600"},
              {name: "Men's Wear", icon: "fa-user-tie", color: "bg-indigo-100 text-indigo-600"},
              {name: "Electronics", icon: "fa-laptop", color: "bg-purple-100 text-purple-600"},
              {name: "Home & Kitchen", icon: "fa-home", color: "bg-green-100 text-green-600"},
              {name: "Beauty", icon: "fa-spa", color: "bg-yellow-100 text-yellow-600"},
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-3 md:p-4 text-center hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer">
                <div className={`${category.color} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 text-xl md:text-2xl`}>
                  <i className={`fas ${category.icon}`}></i>
                </div>
                <h3 className="text-sm md:text-base font-medium text-gray-700">{category.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 md:p-6 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white">GET IN TOUCH</h2>
            <p className="text-blue-100 text-sm md:text-base">We'd love to hear from you!</p>
          </div>
          <form className="p-4 md:p-6 space-y-3 md:space-y-4">
            <div>
              <label className="block font-semibold mb-1 md:mb-2 text-gray-700">Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent" 
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 md:mb-2 text-gray-700">Email</label>
              <input 
                type="email" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent" 
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 md:mb-2 text-gray-700">Message</label>
              <textarea 
                rows="4" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Your message"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-2 md:py-3 rounded-lg shadow hover:shadow-md transition-all hover:opacity-90"
            >
              SEND MESSAGE
            </button>
          </form>
        </section>
      </main>

      {/* FOOTER - Full width */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-8 md:py-12 w-full">
        <div className="w-full px-4 mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 flex items-center">
              <img src="/images/indiyase-logo.jpeg" alt="Indiyase Logo" className="h-8 w-auto mr-2 rounded" />
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
              Your trusted partner for medicines, fashion, and daily essentials at the best prices.
            </p>
            <div className="flex gap-3 md:gap-4">
              <a href="#" className="text-gray-300 hover:text-white text-lg md:text-xl transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-lg md:text-xl transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-lg md:text-xl transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-lg md:text-xl transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-1 md:space-y-2">
              {['About Us', 'Products', 'Offers', 'Blog', 'Contact'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm md:text-base">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4">Contact Info</h3>
            <address className="not-italic text-gray-300 space-y-1 md:space-y-2 text-sm md:text-base">
              <p className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-orange-400"></i>
                Tirumala Trade Centre, Hubli, Karnataka
              </p>
              <p className="flex items-center">
                <i className="fas fa-phone-alt mr-2 text-orange-400"></i>
                +91-90190 89906
              </p>
              <p className="flex items-center">
                <i className="fas fa-envelope mr-2 text-orange-400"></i>
                indiyase@gmail.com
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-xs md:text-sm">
          <p>© {new Date().getFullYear()} Indiyase. All rights reserved</p>
          <div className="flex justify-center gap-3 md:gap-4 mt-2">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Shipping Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;