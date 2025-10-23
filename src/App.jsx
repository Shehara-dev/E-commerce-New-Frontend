import React from 'react';
import {BrowserRouter as Router,Routes,Route,} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';


import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


import Home from './pages/client/Home.jsx';
import ProductDetail from './pages/client/ProductDetail.jsx';
import Cart from './pages/client/Cart.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';


import Checkout from './pages/client/Checkout.jsx';
import PaymentSuccess from './pages/client/PaymentSuccess.jsx';
import MyOrders from './pages/client/MyOrders.jsx';


import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageProducts from './pages/admin/ManageProducts.jsx';
import ManageOrders from './pages/admin/ManageOrders.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main className="container mx-auto p-4"> 
            <Routes>
             
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />

              
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-cancel" element={<Cart />} />
              </Route>

              
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ManageProducts />} />
                <Route path="/admin/orders" element={<ManageOrders />} />
              </Route>
              
              <Route path="*" element={<h1 className="text-center text-3xl mt-10">404 - Page Not Found</h1>} />
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;