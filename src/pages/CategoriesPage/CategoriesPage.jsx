import React, { useState } from 'react';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import Button from '../../components/common/Button';

const CategoriesPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSuccess = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-600 mt-1">Tạo và quản lý các danh mục sản phẩm</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {showForm ? "Ẩn form" : "+ Thêm danh mục"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <CategoryForm 
            onCancel={() => setShowForm(false)}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}

      <CategoryList />
    </div>
  );
};

export default CategoriesPage;