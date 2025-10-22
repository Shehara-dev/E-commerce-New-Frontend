// src/pages/client/MyOrders.jsx
import React, { useEffect, useState } from 'react';
import orderService from '../../services/orderService';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const data = await orderService.getMyOrders(page, limit);
                setOrders(data.orders);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [page]);

    if (loading) return <div>Loading your orders...</div>;

    return (
        <div>
            <h2>My Orders</h2>
            {orders.length === 0 && <div>You have no orders yet.</div>}
            
            {orders.map(order => (
                <div key={order.orderID} style={{ border: '1px solid #333', padding: '15px', margin: '15px 0' }}>
                    <p><strong>Order ID:</strong> {order.orderID}</p>
                    <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> LKR {order.total.toFixed(2)}</p>
                    <p><strong>Status:</strong> <span style={{ color: order.status === 'confirmed' ? 'green' : 'blue' }}>{order.status.toUpperCase()}</span></p>
                    <p><strong>Payment Status:</strong> {order.paymentStatus.toUpperCase()}</p>

                    <h4>Items:</h4>
                    <ul>
                        {order.items.map((item, index) => (
                            <li key={index}>{item.name} x {item.qty} (LKR {item.price.toFixed(2)} each)</li>
                        ))}
                    </ul>
                </div>
            ))}

            <div style={{ marginTop: '20px' }}>
                <button 
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
                    disabled={page === 1}
                >Previous</button>
                <span style={{ margin: '0 15px' }}>Page {page} of {totalPages}</span>
                <button 
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={page === totalPages}
                >Next</button>
            </div>
        </div>
    );
};

export default MyOrders;