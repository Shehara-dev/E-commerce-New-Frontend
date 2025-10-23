import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Could not parse cart from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === product.productId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.productId
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, qty: quantity }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.productId === productId ? { ...item, qty: quantity } : item
      ).filter(item => item.qty > 0);
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.productId !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};