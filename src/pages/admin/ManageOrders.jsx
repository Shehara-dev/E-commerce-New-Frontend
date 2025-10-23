
import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/orderService.js';

const orderStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const fetchOrders = async () => {
        setLoading(true);
        try {
        
            const response = await getAllOrders(page, limit);
            setOrders(response.data.orders);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
   
            await updateOrderStatus(orderId, { status: newStatus });
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

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
        
        {loading ? (
          <div className="text-center p-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading all orders...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b">Order ID</th>
                    <th className="py-2 px-4 border-b">Customer</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Total</th>
                    <th className="py-2 px-4 border-b">Payment</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center p-8 text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.orderID} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{order.orderID}</td>
                        <td className="py-2 px-4 border-b">{order.name} ({order.email})</td>
                        <td className="py-2 px-4 border-b">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b">
                          <span className={`px-2 py-1 rounded text-xs ${
                            order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                            order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <span className={`px-2 py-1 rounded text-xs ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <select 
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.orderID, e.target.value)}
                            className="p-1 border rounded text-sm"
                          >
                            {orderStatuses.map(s => (
                              <option key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
};

export default ManageOrders;