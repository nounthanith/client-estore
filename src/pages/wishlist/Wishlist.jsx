import React from "react";
import { useWishlist } from "../../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import {
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  TrashIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { getItemImageUrl } from "../../utils/imageUtils";

function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist, getWishlistCount } =
    useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success("Wishlist cleared");
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Start adding products you love to your wishlist!
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {getWishlistCount()} {getWishlistCount() === 1 ? "item" : "items"}{" "}
              in your wishlist
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={handleClearWishlist}
              className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            const imageSrc = getItemImageUrl(item);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/20 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewProduct(item.id)}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-rose-50 hover:text-rose-500 transition-colors"
                        title="Quick View"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-rose-50 hover:text-rose-500 transition-colors"
                        title="Add to Cart"
                      >
                        <ShoppingCartIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 hover:text-red-500 rounded-full shadow-lg transition-colors"
                    title="Remove from Wishlist"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>

                  {/* Featured Badge */}
                  {item.isFeatured && (
                    <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-rose-600 line-clamp-2"
                    onClick={() => handleViewProduct(item.id)}
                  >
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`w-4 h-4 ${
                          i < (item.rating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      ({item.rating || 0})
                    </span>
                  </div>

                  {/* Price and Brand */}
                  <div className="flex items-center justify-between mb-4">
                    {item.price != null && (
                      <span className="text-xl font-bold text-rose-600">
                        ${item.price}
                      </span>
                    )}
                    {item.brand && (
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {item.brand}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium text-sm"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleViewProduct(item.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-rose-300 hover:text-rose-600 transition-colors font-medium text-sm"
                    >
                      <EyeIcon className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Wishlist Summary
              </h3>
              <p className="text-gray-600">
                {getWishlistCount()}{" "}
                {getWishlistCount() === 1 ? "item" : "items"} saved for later
              </p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => {
                  wishlist.forEach((item) => addToCart(item));
                  toast.success("All items added to cart!");
                }}
                className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
              >
                Add All to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
