import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";

// Layouts
import Layout from './components/Layout';
import AdminLayout from "./pages/admin/AdminLayout";

// Admin Pages
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
import ProductList from "./pages/admin/ProductList";  // ✅ Corrected

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from './pages/NotFound';
import OrdersPage from './pages/OrdersPage';
import MyOrdersPage from './pages/MyOrdersPage';
import WalletPage from './pages/WalletPage';
import Uploadprescription from "./pages/Uploadprescription";
import Becomeaseller from "./pages/Becomeaseller";
import CategoryProducts from "./pages/CategoryProducts";
import ProductGrid from "./pages/ProductGrid";
import CategoryPage from './pages/CategoryPage';
import ShippingPage from './pages/ShippingPage';
import CheckoutPaymentPage from "./pages/CheckoutPaymentPage";
import ThankYouPage from "./pages/ThankYouPage";
import CollectionPage from "./pages/CollectionPage";

// FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>

        {/* ✅ Admin Login - outside admin layout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ Admin Routes */}
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

        {/* ✅ Public Routes with shared Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<ProductGrid />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="my-orders" element={<MyOrdersPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="upload-prescription" element={<Uploadprescription />} />
          <Route path="become-a-seller" element={<Becomeaseller />} />
          <Route path="category/:categoryName" element={<CategoryProducts />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="checkout-payment" element={<CheckoutPaymentPage />} />
          <Route path="thankyou" element={<ThankYouPage />} />
          <Route path="collections/:category" element={<CollectionPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </>
  );
};

export default App;
