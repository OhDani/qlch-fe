import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProductForm from './pages/ProductsPage/ProductForm';
import CategoryForm from './pages/CategoriesPage/CategoryForm';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<HomePage />} />
          
          {/* Product Routes */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          
          {/* Category Routes */}
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/new" element={<CategoryForm />} />
          <Route path="categories/:id/edit" element={<CategoryForm />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;