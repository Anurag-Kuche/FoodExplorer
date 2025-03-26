import React from "react";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <button className="float-right text-red-500 text-xl" onClick={onClose}>
          &times;
        </button>
        <img
          src={product.image_front_url || "https://via.placeholder.com/200"}
          alt={product.product_name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2 className="text-2xl font-bold mt-4">{product.product_name}</h2>
        <p className="text-gray-600">Brand: {product.brands || "Unknown"}</p>
        <p className="mt-2 text-gray-700">Ingredients: {product.ingredients_text || "N/A"}</p>
        <p className="mt-2 text-gray-700">Nutrition Score: {product.nutrition_grade_fr || "N/A"}</p>
        <p className="mt-2 text-gray-700">Quantity: {product.product_quantity || "Unknown"} g/ml</p>
      </div>
    </div>
  );
};

export default ProductModal;
