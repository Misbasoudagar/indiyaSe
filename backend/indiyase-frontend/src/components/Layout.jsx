import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header'; // adjust path if Header is elsewhere

const Layout = () => {
  return (
    <div className="w-full bg-white">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
