// src/pages/client/Cart.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

    if (cart.length === 0) {
        return <div>Your cart is empty. <Link to="/">Go shopping</Link></div>;
    }

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            <button onClick={clearCart} style={{ float: 'right', background: 'red' }}>Clear Cart</button>
            {cart.map(item => (
                <div key={item.productId} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    <span style={{ flex: 1, marginLeft: '10px' }}>{item.name}</span>
                    <input 
                        type="number" 
                        value={item.qty} 
                        min="1"
                        onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                        style={{ width: '60px', margin: '0 20px' }}
                    />
                    <span>LKR {(item.price * item.qty).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.productId)} style={{ background: 'darkred', marginLeft: '20px' }}>Remove</button>
                </div>
            ))}
            <h3>Total: LKR {cartTotal.toFixed(2)}</h3>
            <Link to="/checkout">
                <button disabled={cart.length === 0}>Proceed to Checkout</button>
            </Link>
        </div>
    );
};

export default Cart;