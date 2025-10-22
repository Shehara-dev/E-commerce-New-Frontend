// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, qty = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === product.productId);

            if (existingItem) {
                // Update quantity
                return prevCart.map(item =>
                    item.productId === product.productId
                        ? { ...item, qty: item.qty + qty }
                        : item
                );
            } else {
                // Add new item
                return [...prevCart, { ...product, qty }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };

    const updateQuantity = (productId, newQty) => {
        setCart(prevCart => prevCart.map(item =>
            item.productId === productId
                ? { ...item, qty: newQty }
                : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
    const cartCount = cart.reduce((count, item) => count + item.qty, 0);

    return (
        <CartContext.Provider value={{ cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};