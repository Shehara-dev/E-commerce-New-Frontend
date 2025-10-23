import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-xl mb-6">Welcome, {user?.name}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/admin/products"
          className="block p-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          <h2 className="text-2xl font-semibold">Manage Products</h2>
          <p>View, create, edit, and delete products.</p>
        </Link>
        <Link 
          to="/admin/orders"
          className="block p-6 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
        >
          <h2 className="text-2xl font-semibold">Manage Orders</h2>
          <p>View and update customer orders.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;