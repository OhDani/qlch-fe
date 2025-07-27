// src/contexts/CategoryContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { categoryService } from '../services/categoryService';

// eslint-disable-next-line react-refresh/only-export-components
export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAll();
      console.log('🔍 Fetched categories:', data);
      
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Categories data is not an array:', data);
        setCategories([]);
      }
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      setError(error.message || 'Lỗi khi tải danh mục');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (error) {
      console.error('❌ Error creating category:', error);
      throw error;
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const updatedCategory = await categoryService.update(id, categoryData);
      setCategories(prev =>
        prev.map(c => c.id === id ? updatedCategory : c)
      );
      return updatedCategory;
    } catch (error) {
      console.error('❌ Error updating category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryService.remove(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('❌ Error deleting category:', error);
      throw error;
    }
  };

  const value = {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch: fetchCategories
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};