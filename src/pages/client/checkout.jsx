// src/pages/client/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import orderService from '../../services/orderService';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        phone: user?.phone || '',
        city: 'Colombo',
        paymentMethod: 'payhere',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayHerePayment = (payhereData) => {
        // This relies on the PayHere SDK being available in index.html
        window.payhere.startPayment(payhereData);

        window.payhere.onCompleted = function onCompleted(orderId) {
            console.log("Payment Completed. OrderID:" + orderId);
            clearCart();
            navigate(`/payment-success?order_id=${payhereData.order_id}&status=2`);
        };

        window.payhere.onFailed = function onFailed(orderId) {
            console.log("Payment Failed. OrderID:" + orderId);
            setError("Payment failed. Please try again.");
            // Optionally navigate to a failure page
        };

        window.payhere.onCanceled = function onCanceled(orderId) {
            console.log("Payment Canceled. OrderID:" + orderId);
            setError("Payment was cancelled by the user.");
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const orderItems = cart.map(item => ({
            productId: item.productId,
            qty: item.qty
        }));
        
        const orderRequest = {
            ...formData,
            items: orderItems,
            // Assuming address and phone are filled from form
        };

        try {
            const response = await orderService.createOrder(orderRequest);

            if (response.payhereData) {
                handlePayHerePayment(response.payhereData);
            } else {
                // Cash on Delivery success
                clearCart();
                navigate(`/orders`, { state: { message: "Order placed successfully (Cash on Delivery).", isSuccess: true } });
            }
        } catch (err) {
            setError(err.message || "Failed to place order. Check stock or try again.");
        }
    };

    if (cart.length === 0) {
        return <div>Your cart is empty. <Link to="/">Go shopping</Link></div>;
    }

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <h3>Shipping Details (User: {user.email})</h3>
                <label>Address:</label>
                <input name="address" value={formData.address} onChange={handleChange} required />
                <label>Phone:</label>
                <input name="phone" value={formData.phone} onChange={handleChange} required />
                <label>City (for PayHere):</label>
                <input name="city" value={formData.city} onChange={handleChange} required />

                <h3>Payment</h3>
                <label>
                    <input type="radio" name="paymentMethod" value="payhere" checked={formData.paymentMethod === 'payhere'} onChange={handleChange} />
                    PayHere (Card/Online)
                </label>
                <label>
                    <input type="radio" name="paymentMethod" value="cash_on_delivery" checked={formData.paymentMethod === 'cash_on_delivery'} onChange={handleChange} />
                    Cash on Delivery
                </label>
                
                <h3 style={{ marginTop: '20px' }}>Order Total: LKR {cartTotal.toFixed(2)}</h3>

                {error && <p className="alert-error">{error}</p>}
                
                <button type="submit" style={{ background: '#28a745' }}>Place Order & Pay</button>
            </form>
        </div>
    );
};

export default Checkout;