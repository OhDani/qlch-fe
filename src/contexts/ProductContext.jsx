// src/contexts/ProductContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { productService } from '../services/productService';

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      console.log('🔍 Fetched products:', data);
      setProducts(data || []);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError(err.message || 'Lỗi khi tải sản phẩm');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (payload) => {
    try {
      const newProduct = await productService.create(payload);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('❌ Error creating product:', error);
      throw error;
    }
  };

  const updateProduct = async (id, payload) => {
    try {
      const updated = await productService.update(id, payload);
      setProducts(prev =>
        prev.map(p => (p.id === id ? updated : p))
      );
      return updated;
    } catch (error) {
      console.error('❌ Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.remove(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refetch: fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};