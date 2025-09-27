import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import api from "../lib/api";
import toast from "react-hot-toast";

export const useOrder = () => {
  const { cart, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const savedAddress = localStorage.getItem("shippingAddress");
      return savedAddress
        ? JSON.parse(savedAddress)
        : {
            name: "",
            phone: "",
            address: "",
            province: "",
            note: "",
          };
    } catch {
      return {
        name: "",
        phone: "",
        address: "",
        province: "",
        note: "",
      };
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [getOrderError, setGetOrderError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.province
    ) {
      toast.error("Please fill in all required shipping fields.");
      return;
    }

    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

    setLoading(true);
    setError(null);

    const subtotal = getTotalPrice();
    const shippingCost = subtotal > 50 ? 0 : 1.5;
    const totalPrice = subtotal + shippingCost;

    const orderData = {
      shippingAddress,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      totalPrice: totalPrice,
    };

    try {
      await api.post("/order", orderData);
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Failed to place order:", err);
      setError(err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (phone) => {
    if (!phone) {
      toast.error("Please enter a phone number.");
      return;
    }
    setLoadingOrders(true);
    setGetOrderError(null);
    try {
      const response = await api.get(`/order/${phone}`);
      setOrders(response.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setGetOrderError(err);
      toast.error(
        "Failed to fetch orders. Please check the phone number and try again."
      );
    } finally {
      setLoadingOrders(false);
    }
  };

  return {
    shippingAddress,
    loading,
    error,
    orders,
    loadingOrders,
    getOrderError,
    handleInputChange,
    handlePlaceOrder,
    getOrder,
  };
};
