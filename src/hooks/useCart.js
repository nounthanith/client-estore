import { useEffect, useState } from "react";

export default function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addToCart = (id) => {
    setCart((prev) => {
      const updated = [...prev, id];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };
  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      const updated = prev.map((item) => item.id === id ? { ...item, quantity } : item);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  return { cart, addToCart, removeFromCart, updateQuantity };
}
