import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img
        src={product.image_front_url || "https://via.placeholder.com/150"}
        alt={product.product_name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{product.product_name || "Unknown"}</h3>
      <p className="text-gray-500 text-sm">Brand: {product.brands || "N/A"}</p>
      <p className="text-gray-600 text-xs mt-1">
        Ingredients: {product.ingredients_text ? product.ingredients_text.slice(0, 100) + "..." : "N/A"}
      </p>
    </div>
  );
};

export default ProductCard;
