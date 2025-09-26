import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      const parsedWishlist = saved ? JSON.parse(saved) : [];
      // Filter out any null/undefined items from localStorage
      return Array.isArray(parsedWishlist) ? parsedWishlist.filter(item => item && item.id) : [];
    } catch {
      return [];
    }
  });

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      // Filter out any null/undefined items first
      const validWishlist = prev.filter(item => item && item.id);
      
      // Check if product already exists in wishlist
      const existingItem = validWishlist.find(item => item.id === product._id || item.id === product.id);
      
      if (existingItem) {
        // If exists, don't add again
        return validWishlist;
      } else {
        // If new, add to wishlist
        return [...validWishlist, {
          id: product._id || product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0], // Store just the filename, not the full URL
          brand: product.brand?.name,
          category: product.category?.name,
          rating: product.rating,
          isFeatured: product.isFeatured,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter(item => item && item.id && item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item && item.id === productId);
  };

  const getWishlistCount = () => {
    return wishlist.filter(item => item && item.id).length;
  };

  const toggleWishlist = (product) => {
    const productId = product._id || product.id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    toggleWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
