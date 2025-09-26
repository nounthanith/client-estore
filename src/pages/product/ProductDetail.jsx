import React, { useState } from "react";
import useProductDetail from "../../hooks/useProductDetail";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import toast from "react-hot-toast";
import {
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
  const { product, loading, error } = useProductDetail();
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    if (product) {
      // Add the product with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success(`${quantity} x ${product.name} added to cart!`);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      toggleWishlist(product);
      const isWishlisted = isInWishlist(product._id);
      toast.success(
        isWishlisted
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist`
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 text-lg">Failed to load product</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No product found</p>
        </div>
      </div>
    );
  }

  // Default to first image
  const mainImage = selectedImage || product.images[0];

  // Format createdAt date
  const formattedDate = new Date(product.createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className=" border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl shadow-sm border overflow-hidden">
              <img
                src={`${import.meta.env.VITE_IMG_URL}${mainImage}`}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 mt-2 ml-1 flex-shrink-0 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                      mainImage === img
                        ? "border-rose-500 scale-105 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:scale-105"
                    }`}
                  >
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${img}`}
                      alt={`thumb-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Product Title & Brand */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              {product.brand && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm">by</span>
                  <span className="font-medium text-rose-600">
                    {product.brand.name}
                  </span>
                  {product.brand.country && (
                    <span className="text-sm text-gray-400">
                      ({product.brand.country})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIconSolid
                    key={i}
                    className={`w-5 h-5 ${
                      i < (product.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {product.rating || 0}
                </span>
              </div>
              <span className="text-sm text-gray-500">(0 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-rose-600">
                ${product.price}
              </span>
              {product.isFeatured && (
                <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg">-</span>
                </button>
                <span className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 py-4 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors font-medium text-lg"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    isInWishlist(product?._id)
                      ? "border-rose-500 bg-rose-50 text-rose-600"
                      : "border-gray-300 hover:border-rose-300 hover:bg-rose-50"
                  }`}
                >
                  <HeartIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <TruckIcon className="w-6 h-6 text-rose-500" />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-6 h-6 text-rose-500" />
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-500">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ArrowPathIcon className="w-6 h-6 text-rose-500" />
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-500">30-day policy</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">SKU:</span>
                  <span className="text-gray-900">{product._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-900">
                    {product.category?.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Added:</span>
                  <span className="text-gray-900">{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
