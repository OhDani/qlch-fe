import { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";

const ProductForm = () => {
  const { addProduct } = useContext(ProductContext);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(form);
    setForm({ name: "", price: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Tên" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Giá" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" />
      <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">Tạo</button>
    </form>
  );
};

export default ProductForm;
