// src/pages/ProductsPage/ProductList.jsx
import React, { useState, useContext, useMemo } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { useCategories } from "../../contexts/CategoryContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, deleteProduct, loading } = useContext(ProductContext);
  const { categories } = useCategories();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid');

  // Helper function to get category name
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Chưa phân loại';
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Category filter - check both product.categoryId and product.category.id
      const matchesCategory = !selectedCategory || 
                             product.categoryId === selectedCategory ||
                             (product.category && product.category.id === selectedCategory);
      
      // Stock filter
      // const matchesStock = !stockFilter || 
      //   (stockFilter === 'in-stock' && product.quantity > 0) ||
      //   (stockFilter === 'out-of-stock' && product.quantity === 0) ||
      //   (stockFilter === 'low-stock' && product.quantity > 0 && product.quantity < 10);

      return matchesSearch && matchesCategory;
      // && matchesStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'quantity-asc':
          return a.quantity - b.quantity;
        case 'quantity-desc':
          return b.quantity - a.quantity;
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory
    // , stockFilter
    , sortBy]);

  // Count products by category
  const getProductCountByCategory = (categoryId) => {
    return products.filter(p => 
      p.categoryId === categoryId || 
      (p.category && p.category.id === categoryId)
    ).length;
  };

  // Reset filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setStockFilter('');
    setSortBy('name-asc');
  };

  const hasActiveFilters = searchTerm || selectedCategory || stockFilter || sortBy !== 'name-asc';

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm theo tên hoặc mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
              >
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="">Tất cả danh mục ({products.length})</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({getProductCountByCategory(category.id)})
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái kho</label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="">Tất cả ({products.length})</option>
              <option value="in-stock">Còn hàng ({products.filter(p => p.quantity > 0).length})</option>
              <option value="low-stock">Sắp hết ({products.filter(p => p.quantity > 0 && p.quantity < 10).length})</option>
              <option value="out-of-stock">Hết hàng ({products.filter(p => p.quantity === 0).length})</option>
            </select>
          </div> */}

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="name-asc">Tên A → Z</option>
              <option value="name-desc">Tên Z → A</option>
              <option value="price-asc">Giá thấp → cao</option>
              <option value="price-desc">Giá cao → thấp</option>
              <option value="quantity-asc">Số lượng ít → nhiều</option>
              <option value="quantity-desc">Số lượng nhiều → ít</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>

          {/* View Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hiển thị</label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Lưới
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Danh sách
              </button>
            </div>
          </div>
        </div>

        {/* Results & Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Hiển thị <span className="font-semibold text-indigo-600">{filteredAndSortedProducts.length}</span> 
              {" "}trên <span className="font-semibold">{products.length}</span> sản phẩm
            </span>

            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-yellow-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  Đang lọc
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700 underline"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Tìm kiếm: "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="ml-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {selectedCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Danh mục: {getCategoryName(selectedCategory)}
                <button onClick={() => setSelectedCategory('')} className="ml-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {stockFilter && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Trạng thái: {stockFilter === 'in-stock' ? 'Còn hàng' : stockFilter === 'low-stock' ? 'Sắp hết' : 'Hết hàng'}
                <button onClick={() => setStockFilter('')} className="ml-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {sortBy !== 'name-asc' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Sắp xếp: {sortBy === 'name-desc' ? 'Tên Z-A' : 
                          sortBy === 'price-asc' ? 'Giá thấp-cao' : 
                          sortBy === 'price-desc' ? 'Giá cao-thấp' : 
                          sortBy === 'quantity-asc' ? 'SL ít-nhiều' : 
                          sortBy === 'quantity-desc' ? 'SL nhiều-ít' : 'Mới nhất'}
                <button onClick={() => setSortBy('name-asc')} className="ml-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products Display */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="text-gray-400 mb-6">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {hasActiveFilters ? 'Không tìm thấy sản phẩm' : 'Chưa có sản phẩm nào'}
          </h3>
          <p className="text-gray-600 mb-6">
            {hasActiveFilters 
              ? 'Thử điều chỉnh bộ lọc để xem nhiều sản phẩm hơn' 
              : 'Hãy thêm sản phẩm đầu tiên của bạn'
            }
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Xóa tất cả bộ lọc
            </button>
          )}
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => deleteProduct(product.id)}
              viewMode={viewMode}
              getCategoryName={getCategoryName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;