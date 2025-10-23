import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="container mx-auto p-4 text-center mt-20">
      <div className="max-w-md mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <Link
          to="/my-orders"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          View Your Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;