import React, { useMemo, useState } from "react";
import useProduct from "../../hooks/useProduct";
import useCategories from "../../hooks/useCategories";
import useBrands from "../../hooks/useBrands";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import toast from "react-hot-toast";
import {
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  EyeIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import ModernDropdown from "../../components/ModernDropdown";

function Product() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const { categories, loading: loadingCategories } = useCategories();
  const { brands, loading: loadingBrands } = useBrands();

  const { products, loading, error } = useProduct({
    page,
    limit,
    search,
    category: category || undefined,
    brand: brand || undefined,
  });

  const productDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (product) => {
    toggleWishlist(product);
    const isWishlisted = isInWishlist(product._id || product.id);
    toast.success(
      isWishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`
    );
  };

  const canGoPrev = page > 1;
  const canGoNext = useMemo(() => {
    return Array.isArray(products) ? products.length === limit : true;
  }, [products, limit]);

  const onPrev = () => {
    if (canGoPrev) setPage((p) => Math.max(1, p - 1));
  };
  const onNext = () => {
    if (canGoNext) setPage((p) => p + 1);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className=" border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Our Products
            </h1>
            <p className="text-lg text-gray-600">
              Discover amazing products at great prices
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="border-b p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors text-sm sm:text-base"
            >
              <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Filters</span>
              {(search || category || brand) && (
                <span className="bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {[search, category, brand].filter(Boolean).length}
                </span>
              )}
            </button>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 sm:p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-rose-100 text-rose-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                title="Grid View"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 sm:p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-rose-100 text-rose-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                title="List View"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 hover:border-gray-400 hover:shadow-md"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
                  />
                </svg>
              </div>

              {/* Category */}
              <ModernDropdown
                options={categories || []}
                value={category}
                onChange={(value) => {
                  setCategory(value);
                  setPage(1);
                }}
                placeholder="All Categories"
                searchable={true}
                loading={loadingCategories}
                className="w-full"
              />

              {/* Brand */}
              <ModernDropdown
                options={brands || []}
                value={brand}
                onChange={(value) => {
                  setBrand(value);
                  setPage(1);
                }}
                placeholder="All Brands"
                searchable={true}
                loading={loadingBrands}
                className="w-full"
              />
            </div>

            {/* Active Filters */}
            {(search || category || brand) && (
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600">Active filters:</span>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                    setBrand("");
                    setPage(1);
                  }}
                  className="text-sm text-rose-600 hover:text-rose-700 font-medium underline"
                >
                  Clear all
                </button>
                {search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm">
                    Search: {search}
                    <button
                      onClick={() => setSearch("")}
                      className="ml-1 hover:text-rose-600"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm">
                    Category:{" "}
                    {categories?.find((c) => c._id === category)?.name}
                    <button
                      onClick={() => setCategory("")}
                      className="ml-1 hover:text-rose-600"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {brand && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm">
                    Brand: {brands?.find((b) => b._id === brand)?.name}
                    <button
                      onClick={() => setBrand("")}
                      className="ml-1 hover:text-rose-600"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
                <p className="text-gray-500 text-lg">Loading products...</p>
              </div>
            </div>
            {/* Loading Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {error && !loading && (
          <div className="flex items-center justify-center py-16">
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
              <p className="text-red-600 text-lg">Failed to load products</p>
            </div>
          </div>
        )}

        {/* Products Count & Results */}
        {!loading && !error && products && products.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-600">
              Showing <span className="font-medium">{products.length}</span>{" "}
              products
              {(search || category || brand) && (
                <span className="text-rose-600"> (filtered)</span>
              )}
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <span>Page {page}</span>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        {!loading && !error && (
          <>
            {!products || products.length === 0 ? (
              <div className="flex items-center justify-center py-16">
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
                  <p className="text-gray-500 text-lg">No products found</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6"
                    : "space-y-3 sm:space-y-4"
                }
              >
                {products.map((product) => {
                  const imageSrc = product?.images?.[0]
                    ? `${import.meta.env.VITE_IMG_URL}${product.images[0]}`
                    : undefined;

                  if (viewMode === "list") {
                    return (
                      <div
                        key={product._id}
                        className="bg-white rounded-none shadow-sm border p-4 sm:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                          <div className="w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-none overflow-hidden flex-shrink-0">
                            {imageSrc ? (
                              <img
                                onClick={() => productDetail(product._id)}
                                src={imageSrc}
                                alt={product.name}
                                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h3
                                className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-rose-600"
                                onClick={() => productDetail(product._id)}
                              >
                                {product.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                                {product.price != null && (
                                  <span className="text-xl sm:text-2xl font-bold text-rose-600">
                                    ${product.price}
                                  </span>
                                )}
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <StarIconSolid
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < (product.rating || 0)
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-gray-500 ml-1">
                                    ({product.rating || 0})
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm sm:text-base"
                                title="Add to Cart"
                              >
                                <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Add to Cart</span>
                              </button>
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleToggleWishlist(product)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    isInWishlist(product._id)
                                      ? "text-rose-500 bg-rose-50"
                                      : "text-gray-400 hover:text-rose-500 hover:bg-rose-50"
                                  }`}
                                  title={
                                    isInWishlist(product._id)
                                      ? "Remove from Wishlist"
                                      : "Add to Wishlist"
                                  }
                                >
                                  <HeartIcon className="w-5 h-5" />
                                </button>
                                <button
                                  className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Quick View"
                                >
                                  <EyeIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={product._id}
                      className="group bg-white rounded-none shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                        {imageSrc ? (
                          <img
                            onClick={() => productDetail(product._id)}
                            src={imageSrc}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
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
                        <div
                          onClick={() => productDetail(product._id)}
                          className="absolute z-10 inset-0 bg-black/20 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleToggleWishlist(product)}
                              className={`p-2 rounded-full shadow-lg transition-colors z-30 ${
                                isInWishlist(product._id)
                                  ? "bg-rose-500 text-white"
                                  : "bg-white hover:bg-rose-50 hover:text-rose-500"
                              }`}
                              title={
                                isInWishlist(product._id)
                                  ? "Remove from Wishlist"
                                  : "Add to Wishlist"
                              }
                            >
                              <HeartIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => productDetail(product._id)}
                              className="p-2 bg-white rounded-full shadow-lg hover:bg-rose-50 hover:text-rose-500 transition-colors"
                              title="Quick View"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="p-2 bg-white rounded-full shadow-lg hover:bg-rose-50 hover:text-rose-500 transition-colors"
                              title="Add to Cart"
                            >
                              <ShoppingCartIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Badge */}
                        {product.isFeatured && (
                          <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="p-3 sm:p-4">
                        <h3
                          className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-rose-600"
                          onClick={() => productDetail(product._id)}
                        >
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 mb-2 sm:mb-3">
                          {Array.from({ length: 5 }, (_, i) => (
                            <StarIconSolid
                              key={i}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                i < (product.rating || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs sm:text-sm text-gray-500 ml-1">
                            ({product.rating || 0})
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-4">
                          {product.price != null && (
                            <span className="text-lg sm:text-2xl font-bold text-rose-600">
                              ${product.price}
                            </span>
                          )}
                          {product.brand && (
                            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start">
                              {product.brand.name}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors font-medium text-sm sm:text-base"
                          title="Add to Cart"
                        >
                          <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Add to Cart</span>
                          <span className="sm:hidden">Add</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 sm:mt-12 flex items-center justify-center">
              <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-xl shadow-sm border p-1 sm:p-2">
                <button
                  onClick={onPrev}
                  disabled={!canGoPrev}
                  className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                    canGoPrev
                      ? "hover:bg-rose-50 hover:text-rose-600 text-gray-700"
                      : "opacity-50 cursor-not-allowed text-gray-400"
                  }`}
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                <div className="px-3 sm:px-4 py-2 bg-rose-500 text-white rounded-xl font-medium text-sm sm:text-base">
                  {page}
                </div>
                <button
                  onClick={onNext}
                  disabled={!canGoNext}
                  className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                    canGoNext
                      ? "hover:bg-rose-50 hover:text-rose-600 text-gray-700"
                      : "opacity-50 cursor-not-allowed text-gray-400"
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Product;
