// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { isAuthenticated, isAdmin, logout, user } = useAuth();
    const { cartCount } = useCart();

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/">Home</Link>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {isAuthenticated && (
                    <span style={{ marginRight: '15px' }}>Hello, {user.name.split(' ')[0]}</span>
                )}
                <Link to="/cart">Cart ({cartCount})</Link>
                {isAdmin && (
                    <Link to="/admin">Dashboard</Link>
                )}
                {isAuthenticated ? (
                    <>
                        <Link to="/orders">My Orders</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;