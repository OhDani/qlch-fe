import React, { createContext, useContext, useEffect, useState } from 'react';
import * as categoryService from '../services/categoryService';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.getCategories()
    .then((res) => setCategories(res.data))
    .catch(console.error);
  }, []);

  const createCategory = async (category) => {
    const res = await categoryService.createCategory(category);
    setCategories((prev) => [...prev, res.data]);
  };

  const updateCategory = async (id, data) => {
    const res = await categoryService.updateCategory(id, data);
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? res.data : c))
    );
  };

  const deleteCategory = async (id) => {
    await categoryService.deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{ categories, createCategory, updateCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
