// src/pages/client/Home.jsx
import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (searchQuery.trim() === '') {
                await fetchProducts(); // Fetch all if search is empty
                return;
            }
            const data = await productService.searchProducts(searchQuery);
            setProducts(data);
        } catch (error) {
            console.error("Error searching products:", error);
            setProducts([]); // Clear products on search error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <div>Loading products...</div>;

    return (
        <div>
            <h2>Products</h2>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Search by name or alternate name..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '400px', display: 'inline' }}
                />
                <button type="submit" style={{ marginLeft: '10px' }}>Search</button>
            </form>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.length > 0 ? products.map(product => (
                    <ProductCard key={product.productId} product={product} />
                )) : <div>No products found.</div>}
            </div>
        </div>
    );
};

export default Home;