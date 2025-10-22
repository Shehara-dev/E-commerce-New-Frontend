// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/client/Home';
import ProductDetail from './pages/client/ProductDetail';
import Cart from './pages/client/Cart';
import Checkout from './pages/client/Checkout';
import PaymentSuccess from './pages/client/PaymentSuccess';
import MyOrders from './pages/client/MyOrders';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';

import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Navbar />
                    <div style={{ padding: '20px' }}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/products/:productId" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/payment-success" element={<PaymentSuccess />} />
                            
                            {/* Customer Protected Routes */}
                            <Route element={<ProtectedRoute requiredRole="Customer" />}>
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/orders" element={<MyOrders />} />
                            </Route>

                            {/* Admin Protected Routes */}
                            <Route element={<ProtectedRoute requiredRole="Admin" />}>
                                <Route path="/admin" element={<AdminDashboard />} />
                                <Route path="/admin/products" element={<ManageProducts />} />
                                <Route path="/admin/orders" element={<ManageOrders />} />
                            </Route>

                            {/* Not Found */}
                            <Route path="*" element={<div>404 Not Found</div>} />
                        </Routes>
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;