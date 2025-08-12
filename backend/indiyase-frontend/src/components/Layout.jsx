import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  const location = useLocation();
  const pathname = decodeURIComponent(location.pathname.toLowerCase());

  const isHomePage = pathname === '/';
  const isCategoryPage = pathname.startsWith('/category/');

  const isFullWidth = isHomePage || isCategoryPage;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main
  className={`w-full px-4 ${isFullWidth ? '' : 'max-w-7xl mx-auto'}`}
>
  <Outlet />
</main>
    </div>
  );
};

export default Layout;
