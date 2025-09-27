import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import Dialog from "../components/Dialog";
import Footer from "../components/Footer";

const navItems = [
  { name: "Products", to: "/" },
  { name: "My Orders", to: "/order" },
  
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const location = useLocation();
  const { cart, getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();

  const isActiveLink = (path) => location.pathname === path;

 

  return (
    <div className="min-h-screen ">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-2 overflow-hidden">
        <Marquee autoFill speed={50} gradient={false} pauseOnHover={true}>
          <div className="flex items-center space-x-8 mr-8">
            <span className="flex items-center space-x-2">
              <TruckIcon className="w-4 h-4" />
              <span>Free shipping on orders over $50!</span>
            </span>
            <span className="flex items-center space-x-2">
              <span>📞</span>
              <span>Customer Service: (+885) 939 392 90</span>
            </span>
            <span className="flex items-center space-x-2">
              <span>🎉</span>
              <span>New arrivals every week!</span>
            </span>
            <span className="flex items-center space-x-2">
              <span>💎</span>
              <span>Premium quality guaranteed</span>
            </span>
            <span className="flex items-center space-x-2">
              <span>🚚</span>
              <span>Fast delivery worldwide</span>
            </span>
            <span className="flex items-center space-x-2">
              <span>⭐</span>
              <span>Rated 5 stars by customers</span>
            </span>
          </div>
        </Marquee>
      </div>

      {/* Main Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">E-Store</span>
            </Link>

            {/* Desktop Menu & Actions */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Navigation Links */}
              <div className="hidden lg:flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActiveLink(item.to)
                        ? "text-rose-600 bg-rose-50"
                        : "text-gray-700 hover:text-rose-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="p-2 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-lg transition-colors relative"
                >
                  <HeartIcon className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getWishlistCount()}
                  </span>
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="p-2 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-lg transition-colors relative"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems() > 9 ? "9+" : getTotalItems()}
                  </span>
                </Link>

                {/* User Account
                <button onClick={() => setIsAccountDialogOpen(true)} className="p-2 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <UserIcon className="w-6 h-6" />
                </button> */}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Cart */}
              <Link
                to="/cart"
                className="p-2 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-lg transition-colors relative"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="p-2 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActiveLink(item.to)
                      ? "text-rose-600 bg-rose-50"
                      : "text-gray-700 hover:text-rose-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Link
                  to="/wishlist"
                  className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <HeartIcon className="w-5 h-5" />
                  <span>Wishlist</span>
                </Link>
                {/* <button
                  onClick={() => {
                    setIsAccountDialogOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Account</span>
                </button> */}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Account Dialog */}
      <Dialog
        isOpen={isAccountDialogOpen}
        onClose={() => setIsAccountDialogOpen(false)}
        title="Your Account"
      >
        <div className="space-y-4">
          <p className="text-gray-600">Sign in or create an account to track orders, save wishlist, and more.</p>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              onClick={() => setIsAccountDialogOpen(false)}
              className="flex-1 text-center px-4 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsAccountDialogOpen(false)}
              className="flex-1 text-center px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:border-rose-300 hover:text-rose-600 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </Dialog>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Navbar;
