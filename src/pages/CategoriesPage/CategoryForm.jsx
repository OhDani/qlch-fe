import React, { useState } from "react";
// import Input from "../../../shared/components/Input";
import Button from "../../components/common/Button";
import { useCategories } from "../../contexts/CategoryContext";

const CategoryForm = ({ initialData = {}, onCancel, onSuccess }) => {
  const { createCategory, updateCategory } = useCategories();
  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(initialData.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim()) {
      setError("Tên danh mục không được để trống");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const categoryData = {
        name: form.name.trim(),
        description: form.description.trim()
      };
      
      if (isEditing) {
        await updateCategory(initialData.id, categoryData);
      } else {
        await createCategory(categoryData);
      }

      // Reset form
      setForm({ name: "", description: "" });
      
      // Callback success
      if (onSuccess) onSuccess();
      
    } catch (err) {
      console.error('Error saving category:', err);
      setError(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h3 className="text-xl font-semibold mb-6">
        {isEditing ? "Sửa danh mục" : "Thêm danh mục mới"}
      </h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Tên danh mục <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nhập tên danh mục"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Mô tả
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Nhập mô tả danh mục (tùy chọn)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        
        <div className="flex gap-3 justify-end pt-4">
          {onCancel && (
            <Button 
              onClick={onCancel} 
              variant="ghost" 
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Hủy
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md"
          >
            {loading ? "Đang lưu..." : (isEditing ? "Cập nhật" : "Tạo mới")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;