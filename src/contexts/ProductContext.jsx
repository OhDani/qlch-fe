// src/contexts/ProductContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { productService } from '../services/productService';

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* lấy danh sách sản phẩm */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll(); // chỉ dùng getAll hiện có
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const createProduct = async (payload) => {
    const newProduct = await productService.create(payload);
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id, payload) => {
    const updated = await productService.update(id, payload);
    setProducts(prev =>
      prev.map(p => (p.id === id ? updated : p))
    );
    return updated;
  };

  const deleteProduct = async (id) => {
    await productService.remove(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Nếu cần thêm CRUD sau này, bạn có thể hook qua service khác ở đây

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
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

/* hook tiện dụng */
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductContext);