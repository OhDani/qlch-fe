import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { useCategories } from "../../contexts/CategoryContext";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, createProduct, updateProduct } = useContext(ProductContext);
  const { categories, loading: categoriesLoading } = useCategories();
  
  // Check if editing
  const isEditing = !!id;
  const existingProduct = isEditing ? products.find(p => p.id === parseInt(id)) : null;
  
  const [form, setForm] = useState({
    name: existingProduct?.name || "",
    price: existingProduct?.price || "",
    categoryId: existingProduct?.categoryId || "",
    description: existingProduct?.description || "",
    quantity: existingProduct?.quantity || ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Xóa lỗi khi user bắt đầu nhập
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate dữ liệu
      if (!form.name.trim()) {
        throw new Error("Tên sản phẩm không được để trống");
      }
      if (!form.price || parseFloat(form.price) <= 0) {
        throw new Error("Giá sản phẩm phải lớn hơn 0");
      }
      if (!form.categoryId) {
        throw new Error("Vui lòng chọn danh mục");
      }
      if (!form.quantity || parseInt(form.quantity) < 0) {
        throw new Error("Số lượng phải lớn hơn hoặc bằng 0");
      }

      // Chuẩn bị dữ liệu
      const productData = {
        name: form.name.trim(),
        price: parseFloat(form.price),
        categoryId: parseInt(form.categoryId),
        description: form.description.trim(),
        quantity: parseInt(form.quantity)
      };

      if (isEditing) {
        await updateProduct(parseInt(id), productData);
        setSuccess("Cập nhật sản phẩm thành công!");
      } else {
        await createProduct(productData);
        setSuccess("Tạo sản phẩm thành công!");
      }
      
      // Delay để hiển thị thông báo thành công
      setTimeout(() => {
        navigate("/products");
      }, 1500);
      
    } catch (err) {
      console.error("Lỗi xử lý sản phẩm:", err);
      setError(err.response?.data?.message || err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc muốn hủy? Dữ liệu chưa lưu sẽ bị mất.")) {
      navigate("/products");
    }
  };

  // Loading state cho categories
  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh mục...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/products")}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? `Chỉnh sửa "${existingProduct?.name}"` : 'Thêm sản phẩm mới'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Thông tin sản phẩm
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {isEditing ? 'Cập nhật thông tin sản phẩm' : 'Nhập đầy đủ thông tin để tạo sản phẩm mới'}
            </p>
          </div>

          <div className="px-6 py-6">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Price and Quantity Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₫</span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="0"
                      step="1000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Không có danh mục nào</option>
                  )}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả sản phẩm
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả chi tiết về sản phẩm (tùy chọn)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="4"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading || success}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isEditing ? "Đang cập nhật..." : "Đang tạo..."}
                    </>
                  ) : success ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Thành công
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {isEditing ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Card (if editing) */}
        {isEditing && existingProduct && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Xem trước sản phẩm</h3>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-lg">
                    {(form.name || existingProduct.name).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{form.name || existingProduct.name}</h4>
                  <p className="text-sm text-gray-600">{form.description || existingProduct.description}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="font-bold text-indigo-600">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(form.price || existingProduct.price)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {form.quantity || existingProduct.quantity} có sẵn
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductForm;