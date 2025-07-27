import React, { useState } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

const CategoryForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [name, setName] = useState(initialData.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...initialData, name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="flex gap-2 justify-end">
        {onCancel && <Button onClick={onCancel} variant="ghost">Cancel</Button>}
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default CategoryForm;
