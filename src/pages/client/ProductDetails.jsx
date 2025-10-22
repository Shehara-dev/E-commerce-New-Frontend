// src/pages/client/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/productService';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductDetail(productId);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
                setProduct(null); // Product not found or error
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) return <div>Loading product details...</div>;
    if (!product) return <div>Product not found or unavailable.</div>;

    return (
        <div style={{ display: 'flex', gap: '40px' }}>
            <img src={product.image[0]} alt={product.name} style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
            <div>
                <h1>{product.name}</h1>
                <p>Category: {product.category}</p>
                <p>Description: {product.description}</p>
                {product.labelledPrice > product.price && (
                    <p style={{ textDecoration: 'line-through', color: 'gray' }}>Original Price: LKR {product.labelledPrice.toFixed(2)}</p>
                )}
                <h2>Price: LKR {product.price.toFixed(2)}</h2>
                <p style={{ color: product.stock > 0 ? 'green' : 'red' }}>
                    Stock: {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                </p>
                <button onClick={() => {
                    addToCart(product, 1);
                    alert(`${product.name} added to cart!`);
                }} disabled={product.stock === 0}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;