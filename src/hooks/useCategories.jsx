// import { useContext } from "react";
// import { CategoryContext } from "../contexts/CategoryContext";

// const useCategories = () => {
//   const context = useContext(CategoryContext);
//   if (!context) {
//     throw new Error("useCategories must be used within a CategoryProvider");
//   }
//   return context;
// };

// export default useCategories;
// src/hooks/useCategories.js
import { useState, useEffect } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - thay thế bằng API call thực tế
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockCategories = [
          { id: 1, name: 'Điện thoại', description: 'Các loại điện thoại di động' },
          { id: 2, name: 'Laptop', description: 'Máy tính xách tay' },
          { id: 3, name: 'Phụ kiện', description: 'Phụ kiện điện tử' },
          { id: 4, name: 'Máy tính bảng', description: 'Tablet và iPad' },
          { id: 5, name: 'Tai nghe', description: 'Tai nghe và loa' }
        ];
        
        setCategories(mockCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const createCategory = async (categoryData) => {
    try {
      const newCategory = {
        id: Date.now(),
        ...categoryData,
        createdAt: new Date().toISOString()
      };
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      console.log(err);
      throw new Error('Không thể tạo danh mục');
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      setCategories(prev => 
        prev.map(cat => 
          cat.id === id 
            ? { ...cat, ...categoryData, updatedAt: new Date().toISOString() }
            : cat
        )
      );
    } catch (err) {
      console.log(err)
      throw new Error('Không thể cập nhật danh mục');
    }
  };

  const deleteCategory = async (id) => {
    try {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      console.log(err);
      throw new Error('Không thể xóa danh mục');
    }
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory
  };
};

export default useCategories;
