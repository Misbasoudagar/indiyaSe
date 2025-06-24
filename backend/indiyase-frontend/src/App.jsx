import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
import ProductList from "./pages/admin/ProductList";
import ProductAdd from "./pages/admin/ProductAdd.jsx";
import ProductEdit from "./pages/admin/ProductEdit.jsx";
import AdminLogin from "./pages/admin/AdminLogin";


// Public/User Pages
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';


function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<ProductList />} />
          <Route path="/admin/products/add" element={<ProductAdd />} />
          <Route path="/admin/products/edit/:id" element={<ProductEdit />} />

          <Route path="/admin/login" element={<AdminLogin />} />

        
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
