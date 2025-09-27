import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      const parsedCart = saved ? JSON.parse(saved) : [];
      // Filter out any null/undefined items from localStorage
      return Array.isArray(parsedCart) ? parsedCart.filter(item => item && item.id) : [];
    } catch {
      return [];
    }
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      // Filter out any null/undefined items first
      const validCart = prev.filter(item => item && item.id);
      
      // Check if product already exists in cart
      const existingItem = validCart.find(item => item.id === product._id || item.id === product.id);
      
      if (existingItem) {
        // If exists, increase quantity
        return validCart.map(item =>
          item.id === product._id || item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        // If new, add to cart
        return [...validCart, {
          id: product._id || product.id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.images?.[0],
          quantity: 1,
          brand: product.brand?.name
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item && item.id && item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    // Ensure quantity is a valid number
    const validQuantity = Number(quantity);
    
    if (isNaN(validQuantity) || validQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prev) =>
      prev
        .filter(item => item && item.id) // Filter out null/undefined items
        .map(item =>
          item.id === productId ? { ...item, quantity: validQuantity } : item
        )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => {
      const quantity = Number(item?.quantity) || 0;
      return total + quantity;
    }, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
