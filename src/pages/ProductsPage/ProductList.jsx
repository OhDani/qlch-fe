import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, deleteProduct } = useContext(ProductContext);

  if (!products.length) return <p>Không có sản phẩm nào.</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={() => deleteProduct(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
