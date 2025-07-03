import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrderList from "./pages/admin/AdminOrderList";
import AdminWallet from "./pages/admin/AdminWallet";
import AdminLogin from "./pages/admin/AdminLogin";
import UserList from "./pages/admin/UserList";
import AdminProductList from "./pages/admin/ProductList";
import Adminsellerlist from "./pages/admin/Adminsellerlist";

// Public/User Pages
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from './pages/NotFound';
import OrdersPage from './pages/OrdersPage';
import MyOrdersPage from './pages/MyOrdersPage';
import WalletPage from './pages/WalletPage';
import Uploadprescription from "./pages/Uploadprescription";
import Becomeaseller from "./pages/Becomeaseller";

// FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Public/User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/upload-prescription" element={<Uploadprescription />} />
        <Route path="/become-seller" element={<Becomeaseller />} />
        <Route path="*" element={<NotFound />} />

        {/* ✅ Admin Login - outside layout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ Admin Panel Routes - inside layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<AdminProductList />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<AdminOrderList />} />
          <Route path="wallets" element={<AdminWallet />} />
          <Route path="users" element={<UserList />} />
          <Route path="sellers" element={<Adminsellerlist />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
