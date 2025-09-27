import React from "react";
import { useCart } from "../../contexts/CartContext";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getItemImageUrl } from "../../utils/imageUtils";
import { useOrder } from "../../hooks/useOrder";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { shippingAddress, loading, handleInputChange, handlePlaceOrder } =
    useOrder();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-start">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center gap-4 border-b pb-4"
              >
                <img
                  src={getItemImageUrl(item)}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center border rounded">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 md:mt-0 text-white bg-rose-500 px-3 py-1 rounded hover:bg-rose-600 flex items-center gap-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address & Summary */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Shipping Form */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex-1">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="province"
                  value={shippingAddress.province}
                  onChange={handleInputChange}
                  placeholder="Province"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="note"
                  value={shippingAddress.note}
                  onChange={handleInputChange}
                  placeholder="Optional: Note for delivery"
                  className="w-full p-2 border rounded"
                  rows="2"
                ></textarea>
              </form>
            </div>

            {/* Cart Summary */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex-1">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </p>
                <p className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{totalAmount > 50 ? "Free" : "$1.50"}</span>
                </p>
                <p className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>
                    ${(totalAmount + (totalAmount > 50 ? 0 : 1.5)).toFixed(2)}
                  </span>
                </p>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-6 bg-rose-500 text-white py-2 rounded-lg font-semibold hover:bg-rose-600 transition disabled:bg-gray-400"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
