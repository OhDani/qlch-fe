import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const HomePage = () => {
  const { products, loading, error } = useContext(ProductContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-8">Lỗi tải danh sách sản phẩm</p>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Danh sách sản phẩm</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Không có sản phẩm nào.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
              <p className="text-sm text-slate-600 mb-2">{p.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-2">
                {formatPrice(p.price)}
              </p>
              <p className="text-sm text-slate-500 mb-2">Số lượng: {p.quantity}</p>
              {p.category && (
                <p className="text-xs text-slate-400">
                  Danh mục: {p.category.name}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;