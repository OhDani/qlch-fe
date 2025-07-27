import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import Button from '../../components/common/Button';

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sản phẩm</h1>
        <Button onClick={() => navigate('/products/new')}>
          + Thêm sản phẩm
        </Button>
      </div>
      <ProductList />
    </div>
  );
};

export default ProductsPage;