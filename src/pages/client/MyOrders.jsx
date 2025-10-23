import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../../services/orderService.js';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getMyOrders(page, limit);
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
        setError('');
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">My Orders</h1>

      {loading && <p className="text-center text-gray-500 animate-pulse">Loading orders...</p>}
      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {!loading && !error && (
        <div className="space-y-8">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.orderID} className="border rounded-xl p-6 shadow hover:shadow-lg transition">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4 flex-col sm:flex-row gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Order ID: {order.orderID}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on: {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full 
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'}`}>
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.qty} | ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">
                    Total: Rs:{order.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment: {order.paymentMethod.replace('_', ' ')} ({order.paymentStatus})
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">You have no orders.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
        >
          Previous
        </button>
        <span className="px-4 py-2 font-medium text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
