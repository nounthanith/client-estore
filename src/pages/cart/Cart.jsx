import React from "react";
import { useCart } from "../../contexts/CartContext";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getItemImageUrl } from "../../utils/imageUtils";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-start">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-2"
            >
              <img
                src={getItemImageUrl(item)}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Price: ${item.price}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition"
                    >
                      <span className="text-lg font-semibold">
                        <MinusIcon className="w-4 h-4" />
                      </span>
                    </button>

                    <span className="w-8 h-8 flex items-center justify-center border rounded">
                      <span className="text-sm font-semibold">
                        {item.quantity}
                      </span>
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition"
                    >
                      <span className="text-lg font-semibold">
                        <PlusIcon className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-white bg-rose-500 px-3 py-1 rounded hover:bg-rose-600"
                >
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <TrashIcon className="w-4 h-4" />
                    Remove
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="mt-3">
          <p className="text-gray-700 font-semibold">
            Subtotal: ${totalAmount.toFixed(2)}
          </p>

          <p className="font-semibold">
            {totalAmount > 50 ? (
              <span className="text-green-600">Shipping: Free</span>
            ) : (
              <span className="text-gray-700">Shipping: $1.5</span>
            )}
          </p>

          <p className="text-xl font-bold text-rose-600">
            Total: ${(totalAmount + (totalAmount > 50 ? 0 : 1.5)).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
