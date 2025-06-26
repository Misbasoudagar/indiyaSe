import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductList from "./pages/admin/ProductList";
import AddProduct from "./pages/admin/AddProduct.jsx";
import EditProduct from "./pages/admin/EditProduct.jsx"; // ✅ FIXED
import '@fortawesome/fontawesome-free/css/all.min.css';
import OrderList from "./pages/admin/OrderList";
import WalletList from "./pages/admin/WalletList";
import AdminLogin from "./pages/admin/AdminLogin";
import UserList from "./pages/admin/UserList"; // adjust path if different
import AdminOrderList from "./pages/admin/AdminOrderList";
import AdminWallet from "./pages/admin/AdminWallet";




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
{/* ✅ Place Admin Login here - OUTSIDE AdminLayout */}
<Route path="/admin/login" element={<AdminLogin />} />
        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminLayout />}>
        
<Route path="/admin/orders" element={<AdminOrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/users" element={<UserList />} />

          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/wallets" element={<WalletList />} />
          <Route path="/admin/orders" element={<AdminOrderList />} />
          <Route path="/admin/wallets" element={<AdminWallet />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
