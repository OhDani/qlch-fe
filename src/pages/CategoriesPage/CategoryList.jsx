import React, { useState } from "react";
import CategoryTag from "../../components/CategoryTag";
import CategoryForm from "./CategoryForm";
import { useCategories } from "../../contexts/CategoryContext";

const CategoryList = () => {
  const { categories, loading, deleteCategory } = useCategories();
  const [editingCategory, setEditingCategory] = useState(null);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Đang tải danh mục...</span>
      </div>
    );
  }

  // Empty state
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">Chưa có danh mục nào</p>
        <p className="text-gray-400 text-sm mt-2">Hãy thêm danh mục đầu tiên của bạn</p>
      </div>
    );
  }

  // Handle delete
  const handleDelete = async (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) {
      try {
        await deleteCategory(id);
        console.log(`✅ Đã xóa danh mục: ${name}`);
      } catch (error) {
        console.error('❌ Lỗi xóa danh mục:', error);
        alert('Có lỗi xảy ra khi xóa danh mục');
      }
    }
  };

  // Handle edit
  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleEditSuccess = () => {
    setEditingCategory(null);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Edit Form Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <CategoryForm
              initialData={editingCategory}
              onCancel={handleCancelEdit}
              onSuccess={handleEditSuccess}
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Danh sách danh mục ({categories.length})
        </h3>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200"
          >
            {/* Category Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <CategoryTag name={cat.name} />
              </div>
              
              {/* Action buttons */}
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                  title="Sửa danh mục"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                  title="Xóa danh mục"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Category Description */}
            {cat.description ? (
              <p className="text-sm text-gray-600 leading-relaxed">
                {cat.description}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Chưa có mô tả
              </p>
            )}

            {/* Category Stats (if available) */}
            {cat.productCount !== undefined && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {cat.productCount} sản phẩm
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;