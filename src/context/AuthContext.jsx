// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                // Decode to check validity/expiry
                const decodedUser = jwtDecode(token);
                // Simple check for expiry (you should do a more robust check)
                if (decodedUser.exp * 1000 < Date.now()) {
                    handleLogout();
                } else {
                    // Assuming the local 'user' data is correct and minimal
                    const userData = JSON.parse(localStorage.getItem('user'));
                    setUser({ ...userData, role: decodedUser.role });
                }
            } catch (e) {
                console.error("Invalid token:", e);
                handleLogout();
            }
        }
        setLoading(false);
    }, [token]);

    const handleLogin = async (email, password) => {
        const data = await authService.login(email, password);
        setToken(data.token);
        setUser(data.user);
    };

    const handleLogout = () => {
        authService.logout();
        setToken(null);
        setUser(null);
    };

    const isAdmin = user?.role === 'Admin';
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, loading, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};