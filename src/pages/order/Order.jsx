import React, { useState } from "react";
import { useOrder } from "../../hooks/useOrder";

function Order() {
  const { orders, loadingOrders, getOrderError, getOrder, shippingAddress } =
    useOrder();
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    getOrder(phone);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className="flex-grow p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loadingOrders}
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 disabled:bg-gray-400"
        >
          {loadingOrders ? "Searching..." : "Search"}
        </button>
      </form>

      {getOrderError && <p className="text-red-500">{getOrderError.message}</p>}

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const calculatedTotal = order.items.reduce((acc, item) => {
              if (item.productId && typeof item.productId === "object") {
                const price = Number(item.productId.price) || 0;
                const quantity = Number(item.quantity) || 0;
                return acc + price * quantity;
              }
              return acc;
            }, 0);

            return (
              <div
                key={order._id}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Order ID: {order._id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p>{order.shippingAddress.name}</p>
                  <p>
                    {order.shippingAddress.address},
                    {order.shippingAddress.province}
                  </p>
                  <p>{order.shippingAddress.phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.productId._id || item.productId}
                        className="flex justify-between"
                      >
                        {item.productId &&
                        typeof item.productId === "object" ? (
                          <>
                            <span>
                              {item.productId.name} (x{item.quantity})
                            </span>
                            <span>
                              $
                              {(item.productId.price * item.quantity).toFixed(
                                2
                              )}
                            </span>
                          </>
                        ) : (
                          <span>
                            Product ID: {item.productId} (x{item.quantity})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t mt-4 pt-4 text-right">
                  <p className="font-bold text-lg">
                    Total: ${calculatedTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !loadingOrders && <p>No orders found for this phone number.</p>
      )}
    </div>
  );
}

export default Order;
