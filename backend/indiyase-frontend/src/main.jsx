import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./context/CartContext";

// ✅ Import ToastContainer and styles
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        {/* ✅ Add ToastContainer */}
        <ToastContainer position="top-right" autoClose={3000} />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
