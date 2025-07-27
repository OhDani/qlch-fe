import React from 'react';
import { useProducts } from '../hooks/useProducts';
import Spinner from '../components/common/Spinner';

const HomePage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Lỗi tải danh sách sản phẩm</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Danh sách sản phẩm</h1>

      {products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border rounded p-4 bg-white shadow">
              <h2 className="text-xl font-semibold mb-1">{p.name}</h2>
              <p className="text-sm text-slate-600 mb-2">{p.description}</p>
              <p className="text-lg font-bold text-blue-600">${p.price}</p>
              <p className="text-sm text-slate-500">Số lượng: {p.quantity}</p>
              <p className="text-xs text-slate-400 mt-2">
                Danh mục: {p.category.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;