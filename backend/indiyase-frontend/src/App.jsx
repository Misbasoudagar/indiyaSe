import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
import ProductList from "./pages/admin/ProductList";
import AddProduct from "./pages/admin/AddProduct.jsx";
import EditProduct from "./pages/admin/EditProduct.jsx"; // ✅ FIXED
import '@fortawesome/fontawesome-free/css/all.min.css';
import OrderList from "./pages/admin/OrderList";
import WalletList from "./pages/admin/WalletList";


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
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} /> {/* ✅ This was missing */}
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="wallets" element={<WalletList />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
