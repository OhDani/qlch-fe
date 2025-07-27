import React from "react";

const CategoryTag = ({ name }) => {
  return (
    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
      {name}
    </span>
  );
};

export default CategoryTag;
