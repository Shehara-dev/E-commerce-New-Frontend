// src/pages/client/PaymentSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');
    const status = searchParams.get('status');
    const { clearCart } = useCart();
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Clear cart to finalize the order process
        clearCart();
        
        if (status === '2') {
            setMessage(`Payment successful! Your order (ID: ${orderId}) is confirmed.`);
        } else if (status === '-1') {
            setMessage(`Payment cancelled. Order ID: ${orderId}`);
        } else {
            setMessage('Payment process completed. Check your order status for details.');
        }
    }, [orderId, status, clearCart]);

    return (
        <div>
            <h1 style={{ color: status === '2' ? 'green' : 'orange' }}>Payment Status</h1>
            <p>{message}</p>
            <p>You can check the full status on your <Link to="/orders">My Orders</Link> page.</p>
        </div>
    );
};

export default PaymentSuccess;