import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <nav className="bg-blue-600 text-white p-4 flex space-x-4">
        <NavLink to="/" className="hover:underline">Trang chủ</NavLink>
        <NavLink to="/products" className="hover:underline">Sản phẩm</NavLink>
        <NavLink to="/categories" className="hover:underline">Danh mục</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
