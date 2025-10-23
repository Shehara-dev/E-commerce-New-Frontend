import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Your Cart is Empty</h1>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="grow">
                <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                <p className="text-gray-600 mt-1">Rs:{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    updateQuantity(item.productId, parseInt(e.target.value))
                  }
                  min="1"
                  className="w-16 p-2 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-gray-800">
                ${(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="border rounded-xl p-6 bg-white shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
            <div className="flex justify-between mb-3 text-gray-700">
              <span>Subtotal</span>
              <span>Rs:{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-green-600 font-medium">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-2xl mb-6 text-gray-800">
              <span>Total</span>
              <span>Rs:{cartTotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-linear-to-r from-blue-500 to-indigo-600 text-white text-center py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;