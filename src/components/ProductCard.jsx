import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-xl p-4 shadow w-60">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded-md" />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-500">{product.category}</p>
      <p className="text-blue-600 font-semibold">{product.price}$</p>
    </div>
  );
};

export default ProductCard;
