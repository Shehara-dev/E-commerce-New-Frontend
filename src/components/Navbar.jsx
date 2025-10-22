import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Package, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const { getCartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        E-Shop
                    </Link>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                                    Home
                                </Link>
                                
                                {isAdmin() ? (
                                    <Link 
                                        to="/admin/dashboard" 
                                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                                    >
                                        <LayoutDashboard size={18} />
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link 
                                            to="/my-orders" 
                                            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                                        >
                                            <Package size={18} />
                                            My Orders
                                        </Link>
                                        
                                        <Link 
                                            to="/cart" 
                                            className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                                        >
                                            <ShoppingCart size={20} />
                                            {getCartCount() > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    {getCartCount()}
                                                </span>
                                            )}
                                        </Link>
                                    </>
                                )}

                                <div className="flex items-center gap-3 border-l pl-4">
                                    <div className="flex items-center gap-2">
                                        <User size={18} className="text-gray-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {user.name}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-gray-700 hover:text-blue-600 transition"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}