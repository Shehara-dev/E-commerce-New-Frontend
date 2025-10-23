// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <Link to={`/product/${product.productId}`} className="overflow-hidden rounded-t-xl">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-52 object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.name}>
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-blue-600 font-bold text-lg">Rs:{product.price.toFixed(2)}</span>
          {product.labelledPrice > product.price && (
            <span className="text-gray-400 line-through text-sm">
              ${product.labelledPrice.toFixed(2)}
            </span>
          )}
        </div>

        {user?.role !== 'Admin' ? (
          <button
            onClick={handleAddToCart}
            className="mt-auto w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-auto w-full bg-gray-100 text-gray-600 py-2 rounded-lg font-medium text-center">
            Admin View
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
