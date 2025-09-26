import React, { useState, useMemo, useEffect, useRef } from "react";
import useIsFeatured from "../hooks/useIsFeatured";
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import toast from "react-hot-toast";

function Carousel() {
  const { isFeatured, loading, error } = useIsFeatured();
  const navigate = useNavigate();
  const items = useMemo(
    () => (Array.isArray(isFeatured) ? isFeatured : []),
    [isFeatured]
  );
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const hasItems = items.length > 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      toggleWishlist(product);
      const isWishlisted = isInWishlist(product._id);
      toast.success(isWishlisted ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
    }
  };

  const goPrev = () => {
    if (!hasItems) return;
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  const goNext = () => {
    if (!hasItems) return;
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!hasItems || !isPlaying || isHovered) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [items, hasItems, isPlaying, isHovered]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">
              Loading featured products...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
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
            <p className="text-red-600 text-lg">
              Failed to load featured products
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!hasItems) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <p className="text-gray-500 text-lg">
              No featured products available
            </p>
          </div>
        </div>
      </div>
    );
  }

  const product = items[current];
  const imageSrc = product?.images?.[0]
    ? `${import.meta.env.VITE_IMG_URL}${product.images[0]}`
    : undefined;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl"
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-pink-50/30"></div>

        {/* Blurred background */}
        {imageSrc && (
          <div
            className="absolute inset-0 bg-center bg-cover scale-110 blur-3xl opacity-20"
            style={{ backgroundImage: `url(${imageSrc})` }}
            aria-hidden
          />
        )}

        {/* Main Content */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[500px]">
          {/* Left Side - Product Info */}
          <div className="flex flex-col justify-center p-8 lg:p-12 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                {product?.brand && (
                  <span className="text-sm text-gray-600">
                    by {product.brand.name}
                  </span>
                )}
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {product?.name || "Featured Product"}
              </h2>

              <p className="text-lg text-gray-600 line-clamp-3">
                {product?.description ||
                  "Discover this amazing featured product with exceptional quality and design."}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`w-5 h-5 ${
                        i < (product?.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product?.rating || 0}) •{" "}
                  {product?.category?.name || "Category"}
                </span>
              </div>

              {/* Price */}
              {product?.price && (
                <div className="flex items-center gap-4">
                  <span className="text-4xl lg:text-5xl font-bold text-rose-600">
                    ${product.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${(product.price * 1.2).toFixed(0)}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm font-medium">
                    20% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(`/product/${product?._id}`)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
              >
                View Details
              </button>
              <button onClick={handleAddToCart} className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-rose-300 hover:text-rose-600 transition-colors font-medium text-lg">
                Add to Cart
              </button>
              <button 
                onClick={handleToggleWishlist}
                className={`flex items-center justify-center gap-2 px-8 py-4 border-2 rounded-xl transition-colors font-medium text-lg ${
                  isInWishlist(product?._id)
                    ? "border-rose-500 bg-rose-50 text-rose-600"
                    : "border-gray-300 hover:border-rose-300 hover:bg-rose-50 text-gray-700"
                }`}
              >
                <HeartIcon className="w-6 h-6" />
                {isInWishlist(product?._id) ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>

          {/* Right Side - Product Image */}
          <div className="relative flex items-center justify-center p-8 lg:p-12">
            {imageSrc ? (
              <div className="relative group">
                <img
                  src={imageSrc}
                  alt={product?.name || "Featured product"}
                  className="w-full max-w-md lg:max-w-lg h-auto object-contain rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  !
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md lg:max-w-lg h-80 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-lg">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
          <button
            onClick={goPrev}
            className="pointer-events-auto bg-white/20 hover:bg-white shadow-lg hover:shadow-xl border rounded-full w-12 h-12 flex items-center justify-center text-gray-800 transition-all duration-200 hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            className="pointer-events-auto bg-white/20 hover:bg-white shadow-lg hover:shadow-xl border rounded-full w-12 h-12 flex items-center justify-center text-gray-800 transition-all duration-200 hover:scale-110"
            aria-label="Next"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Play/Pause Button */}
        {/* <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl border rounded-full w-10 h-10 flex items-center justify-center text-gray-800 transition-all duration-200"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
        </button> */}

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full  px-4">
          {items.map((p, idx) => {
            const thumb = p?.images?.[0]
              ? `${import.meta.env.VITE_IMG_URL}${p.images[0]}`
              : undefined;
            return (
              <button
                key={p?._id || idx}
                onClick={() => goToSlide(idx)}
                className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 shadow-sm transition-all duration-200 ${
                  idx === current
                    ? "border-rose-500 scale-110 shadow-lg"
                    : "border-gray-300 hover:border-gray-400 hover:scale-105"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt={p?.name || "thumb"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </button>
            );
          })}
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                idx === current
                  ? "bg-rose-500 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
          {current + 1} / {items.length}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
