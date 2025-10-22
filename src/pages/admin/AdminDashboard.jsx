// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/admin/products"><button>Manage Products</button></Link>
                <Link to="/admin/orders"><button>Manage Orders</button></Link>
            </div>
        </div>
    );
};

export default AdminDashboard;