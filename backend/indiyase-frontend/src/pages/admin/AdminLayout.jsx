import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import {
  MdProductionQuantityLimits,
  MdAddBox,
  MdPeople,
  MdAccountBalanceWallet,
  MdReorder,
  MdStorefront,
} from 'react-icons/md';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { to: '/admin/products', label: 'Product List', icon: <MdProductionQuantityLimits /> },
    { to: '/admin/add-product', label: 'Add Product', icon: <MdAddBox /> },
    { to: '/admin/users', label: 'Manage Users', icon: <MdPeople /> },
    { to: '/admin/wallets', label: 'Wallets', icon: <MdAccountBalanceWallet /> },
    { to: '/admin/orders', label: 'Manage Orders', icon: <MdReorder /> },
    { to: '/admin/sellers', label: 'Manage Sellers', icon: <MdStorefront /> },
  ];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} h-screen w-screen`}>
      {/* Top Navbar for Mobile */}
      <div className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-900 lg:hidden shadow-md">
        <button onClick={toggleMobileMenu} className="text-2xl text-gray-700 dark:text-gray-300">
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
        <button onClick={toggleDarkMode} className="text-2xl text-blue-600">
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      <div className="flex h-full overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 h-full z-40
          bg-white dark:bg-gray-800 shadow-lg transition-all duration-300
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static
        `}>
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-bold text-gray-800 dark:text-white transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}>
              Admin
            </h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 dark:text-gray-300 focus:outline-none lg:block hidden"
            >
              {isSidebarOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
          <ul className="mt-4">
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center space-x-4 px-4 py-3 hover:bg-blue-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200
                     ${isActive ? 'bg-blue-200 dark:bg-gray-700 font-semibold text-blue-700 dark:text-white' : ''}
                    `
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl">{icon}</span>
                  <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Area */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} mt-0`}>
          <div className="flex justify-end items-center px-4 py-4 bg-white dark:bg-gray-900 hidden lg:flex shadow-sm">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
          <main className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
