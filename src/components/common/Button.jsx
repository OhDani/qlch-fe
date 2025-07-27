import React from "react";
import clsx from "clsx";

const Button = ({ children, type = "button", variant = "default", ...props }) => {
  const base = "px-4 py-2 rounded-lg font-semibold transition";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button type={type} className={clsx(base, variants[variant])} {...props}>
      {children}
    </button>
  );
};

export default Button;
