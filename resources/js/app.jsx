import './bootstrap';
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import ProductIndex from './pages/admin/products/Index';
import ProductForm from './pages/admin/products/Form';
import CategoryIndex from './pages/admin/categories/Index';
import CategoryForm from './pages/admin/categories/Form';
import AdminCustomers from './pages/admin/Customers';
import AdminSettings from './pages/admin/Settings';
import AdminInventory from './pages/admin/Inventory';
import CouponIndex from './pages/admin/coupons/Index';
import SupplierIndex from './pages/admin/suppliers/Index';
import SupplierForm from './pages/admin/suppliers/Form';
import AdminReports from './pages/admin/Reports';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { QuickViewProvider } from './context/QuickViewContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Category from './pages/Category';

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <CartProvider>
                <QuickViewProvider>
                    <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/category/:id" element={<Category />} />

                        {/* Admin Auth */}
                        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
                        <Route path="/admin/login" element={<AdminLogin />} />

                        {/* Protected Admin Routes */}
                        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                        <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
                        <Route path="/admin/products" element={<ProtectedRoute><ProductIndex /></ProtectedRoute>} />
                        <Route path="/admin/products/create" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
                        <Route path="/admin/products/:id/edit" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
                        <Route path="/admin/categories" element={<ProtectedRoute><CategoryIndex /></ProtectedRoute>} />
                        <Route path="/admin/categories/create" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
                        <Route path="/admin/categories/:id/edit" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
                        <Route path="/admin/customers" element={<ProtectedRoute><AdminCustomers /></ProtectedRoute>} />
                        <Route path="/admin/inventory" element={<ProtectedRoute><AdminInventory /></ProtectedRoute>} />
                        <Route path="/admin/coupons" element={<ProtectedRoute><CouponIndex /></ProtectedRoute>} />
                        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                        <Route path="/admin/suppliers" element={<ProtectedRoute><SupplierIndex /></ProtectedRoute>} />
                        <Route path="/admin/suppliers/create" element={<ProtectedRoute><SupplierForm /></ProtectedRoute>} />
                        <Route path="/admin/suppliers/:id/edit" element={<ProtectedRoute><SupplierForm /></ProtectedRoute>} />
                        <Route path="/admin/reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />

                        {/* 404 */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    </BrowserRouter>
                </QuickViewProvider>
            </CartProvider>
        </React.StrictMode>
    );
}
