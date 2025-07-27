import React from "react";
import CategoryTag from "../../components/CategoryTag";

const CategoryList = ({ categories }) => {
  if (!categories.length) return <p>No categories</p>;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {categories.map((cat) => (
        <CategoryTag key={cat.id} name={cat.name} />
      ))}
    </div>
  );
};

export default CategoryList;
