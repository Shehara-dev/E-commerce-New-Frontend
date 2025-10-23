// src/pages/client/Home.jsx
import React, { useState, useEffect } from 'react';
import { getAllProducts, searchProducts } from '../../services/productService.js';
import ProductCard from '../../components/ProductCard.jsx';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      fetchProducts();
      return;
    }
    try {
      setLoading(true);
      const response = await searchProducts(searchTerm);
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to search products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
        Explore Our Products
      </h1>

      <form 
        onSubmit={handleSearch} 
        className="mb-8 flex max-w-md mx-auto shadow-lg rounded overflow-hidden"
      >
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          className="flex-grow px-4 py-3 border-none focus:ring-0 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
        >
          Search
        </button>
      </form>

      {loading && (
        <p className="text-center text-gray-500 text-lg animate-pulse">
          Loading products...
        </p>
      )}
      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
