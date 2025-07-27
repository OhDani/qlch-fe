const ProductCard = ({ product, onDelete }) => {
    return (
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p>Giá: {product.price}</p>
        <p>Mô tả: {product.description}</p>
        <button onClick={onDelete} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
          Xoá
        </button>
      </div>
    );
  };
  
  export default ProductCard;
  