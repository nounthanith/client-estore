import React from "react";
import Hero from "./pages/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import ProductDetail from "./pages/product/ProductDetail";
import { Toaster } from "react-hot-toast";
import Product from "./pages/product/Product";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/Footer";
import Order from "./pages/order/Order";
function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#111827",
              color: "#F9FAFB",
            },
            success: {
              iconTheme: {
                primary: "#7C3AED", // violet-600
                secondary: "#F9FAFB",
              },
              style: { background: "#1F2937" }, // gray-800
            },
            error: {
              iconTheme: {
                primary: "#EA580C", // orange-600
                secondary: "#F9FAFB",
              },
              style: { background: "#1F2937" },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Hero />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="login" element={<Login /> } />
            <Route path="register" element={<Register /> } />
            <Route path="order" element={<Order /> } />
            <Route path="/" element={<Footer /> } />
          </Route>

        </Routes>
      </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
