import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        alert(`${product.name} added to cart!`);
    };

    return (
        <div 
            onClick={() => navigate(`/product/${product.productId}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
        >
            <div className="relative h-48 bg-gray-200">
                <img
                    src={product.image[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between">
                    <div>
                        {product.labelledPrice > product.price && (
                            <span className="text-sm text-gray-400 line-through mr-2">
                                LKR {product.labelledPrice.toFixed(2)}
                            </span>
                        )}
                        <span className="text-xl font-bold text-blue-600">
                            LKR {product.price.toFixed(2)}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                    >
                        <ShoppingCart size={18} />
                        Add
                    </button>
                </div>

                <div className="mt-2 text-sm text-gray-500">
                    Stock: {product.stock} available
                </div>
            </div>
        </div>
    );
}