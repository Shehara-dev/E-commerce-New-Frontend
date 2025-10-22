// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    
    const handleAddToCart = () => {
        addToCart(product, 1);
        alert(`${product.name} added to cart!`);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', width: '300px' }}>
            <Link to={`/products/${product.productId}`}>
                <img src={product.image[0]} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <h3>{product.name}</h3>
                <p>Price: LKR {product.price.toFixed(2)}</p>
                {product.labelledPrice > product.price && (
                    <p style={{ textDecoration: 'line-through', color: 'gray' }}>Was: LKR {product.labelledPrice.toFixed(2)}</p>
                )}
            </Link>
            <button onClick={handleAddToCart} disabled={product.stock === 0}>
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    );
};

export default ProductCard;