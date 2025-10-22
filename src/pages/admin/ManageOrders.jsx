// src/pages/admin/ManageOrders.jsx - Basic implementation
import React, { useEffect, useState } from 'react';
import orderService from '../../services/orderService';

const orderStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const fetchOrders = async () => {
        setLoading(true);
        try {
            // Admin fetches all orders
            const data = await orderService.getAllOrders(page, limit);
            setOrders(data.orders);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await orderService.updateOrder(orderId, newStatus, '');
            alert(`Order ${orderId} updated to ${newStatus}`);
            fetchOrders();
        } catch (error) {
            alert("Failed to update order status.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page]);

    if (loading) return <div>Loading all orders...</div>;

    return (
        <div>
            <h2>Manage Orders</h2>
            {orders.map(order => (
                <div key={order.orderID} style={{ border: '1px solid #333', padding: '15px', margin: '15px 0' }}>
                    <p><strong>Order ID:</strong> {order.orderID}</p>
                    <p><strong>Customer:</strong> {order.name} ({order.email})</p>
                    <p><strong>Total:</strong> LKR {order.total.toFixed(2)}</p>
                    <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()} ({order.paymentStatus.toUpperCase()})</p>
                    <p><strong>Address:</strong> {order.address}, {order.phone}</p>
                    <p>
                        <strong>Status:</strong> 
                        <select 
                            value={order.status} 
                            onChange={(e) => handleStatusChange(order.orderID, e.target.value)}
                            style={{ marginLeft: '10px', padding: '5px' }}
                        >
                            {orderStatuses.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                        </select>
                    </p>
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

export default ManageOrders;