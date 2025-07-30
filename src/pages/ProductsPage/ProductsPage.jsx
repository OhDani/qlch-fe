import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import Button from '../../components/common/Button';

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
              <div className="hidden sm:block">
                <nav className="flex space-x-8">
                  <a href="#" className="text-indigo-600 border-b-2 border-indigo-600 py-2 px-1 text-sm font-medium">
                    Tất cả sản phẩm
                  </a>
                </nav>
              </div>
            </div>
            
            <Button
              onClick={() => navigate('/products/new')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm sản phẩm
            </Button>
          </div>
        </div>
      </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ProductList />
        </div>
      </div>
  );
};

export default ProductsPage;