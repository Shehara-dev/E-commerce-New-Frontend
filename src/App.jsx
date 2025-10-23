// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// CONTEXT
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

// COMPONENTS
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// PUBLIC PAGES
import Home from './pages/client/Home.jsx';
import ProductDetail from './pages/client/ProductDetail.jsx';
import Cart from './pages/client/Cart.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// CLIENT PROTECTED PAGES
import Checkout from './pages/client/Checkout.jsx';
import PaymentSuccess from './pages/client/PaymentSuccess.jsx';
import MyOrders from './pages/client/MyOrders.jsx';

// ADMIN PROTECTED PAGES
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageProducts from './pages/admin/ManageProducts.jsx';
import ManageOrders from './pages/admin/ManageOrders.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main className="container mx-auto p-4"> {/* Added main wrapper */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />

              {/* Customer Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-cancel" element={<Cart />} />
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ManageProducts />} />
                <Route path="/admin/orders" element={<ManageOrders />} />
              </Route>
              
              {/* 404 Not Found */}
              <Route path="*" element={<h1 className="text-center text-3xl mt-10">404 - Page Not Found</h1>} />
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;