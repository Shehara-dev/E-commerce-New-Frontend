import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService.js';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    }
  };

  if (loading) return <p className="text-center mt-16 text-gray-500 animate-pulse">Loading product details...</p>;
  if (error) return <p className="text-center mt-16 text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-16 text-gray-500">Product not found.</p>;

  return (
    <div className="container mx-auto p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-12">
        
        <div className="md:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full h-96 object-cover hover:scale-105 transform transition duration-300"
          />
        </div>

        
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-gray-800">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl text-blue-600 font-semibold">${product.price.toFixed(2)}</span>
              {product.labelledPrice > product.price && (
                <span className="text-gray-400 line-through text-lg">
                  Rs:{product.labelledPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-6">
            <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>

            {product.stock > 0 && user?.role !== 'Admin' && (
              <div className="mt-6 flex items-center gap-4">
                <label htmlFor="quantity" className="font-medium text-gray-800">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value))))}
                  min="1"
                  max={product.stock}
                  className="w-20 p-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleAddToCart}
                  className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            )}
            
            {user?.role === 'Admin' && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 font-medium">
                  Admin View: This product is managed in the Admin Panel
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  Go to Admin Panel to edit or manage this product
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
