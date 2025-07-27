import React from 'react';
import CategoryList from './CategoryList';

const CategoriesPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh mục</h1>
      <CategoryList />
    </div>
  );
};

export default CategoriesPage;
