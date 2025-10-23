// src/pages/client/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { createOrder } from '../../services/orderService.js';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  // ... rest of your code ...
  // (The rest of your code from before is correct)
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('payhere'); // 'payhere' or 'cash_on_delivery'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // This is required for PayHere SDK
  React.useEffect(() => {
    if (window.payhere) {
      window.payhere.onCompleted = function (orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        clearCart();
        navigate('/payment-success');
      };

      window.payhere.onDismissed = function () {
        console.log("Payment dismissed");
        setError('Payment was cancelled.');
        setLoading(false);
      };

      window.payhere.onError = function (error) {
        console.log("Payment Error:" + error);
        setError('Payment failed: ' + error + '. Please check your PayHere configuration.');
        setLoading(false);
      };
    }
  }, [clearCart, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    setLoading(true);
    setError('');

    const orderData = {
      address,
      phone,
      paymentMethod,
      items: cartItems.map((item) => ({
        productId: item.productId,
        qty: item.qty,
      })),
    };

    try {
      const response = await createOrder(orderData);
      
      if (paymentMethod === 'payhere') {
        // We received payhereData from the backend
        // Trigger the PayHere payment popup
        if (response.data.payhereData && window.payhere) {
          console.log('Starting PayHere payment with data:', response.data.payhereData);
          window.payhere.startPayment(response.data.payhereData);
          // The loading(false) will be handled by the onDismissed or onError callbacks
        } else {
          throw new Error('PayHere payment data not received or PayHere SDK not loaded.');
        }
      } else {
        // Cash on Delivery
        console.log('Cash on Delivery order placed:', response.data.order);
        clearCart();
        navigate('/my-orders'); // Redirect to my orders page
        setLoading(false);
      }

    } catch (err) {
      console.error('Failed to create order:', err);
      setError(err.response?.data?.message || 'Failed to place order.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Shipping Form */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={user?.name || ''}
                readOnly
                className="w-full p-2 mt-1 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full p-2 mt-1 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="123 Main St, Colombo"
                className="w-full p-2 mt-1 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="0771234567"
                className="w-full p-2 mt-1 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Payment Method */}
            <h2 className="text-xl font-semibold pt-4">Payment Method</h2>
            <div className="space-y-2">
              <div className="flex items-center p-3 border rounded has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                <input 
                  type="radio"
                  id="payhere"
                  name="paymentMethod"
                  value="payhere"
                  checked={paymentMethod === 'payhere'}
                  onChange={() => setPaymentMethod('payhere')}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="payhere" className="ml-3 block text-sm font-medium">
                  Pay with PayHere (Credit/Debit Card)
                </label>
              </div>
              <div className="flex items-center p-3 border rounded has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                <input 
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cash_on_delivery"
                  checked={paymentMethod === 'cash_on_delivery'}
                  onChange={() => setPaymentMethod('cash_on_delivery')}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="cod" className="ml-3 block text-sm font-medium">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:w-1/2">
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {cartItems.map(item => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>{item.name} x {item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition block mt-6 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : `Place Order (${paymentMethod === 'payhere' ? 'Pay Online' : 'Pay on Delivery'})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;