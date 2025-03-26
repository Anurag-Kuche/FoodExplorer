import React from "react";


const ProductCard = ({ product, onClick, addToCart }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-xl p-4 cursor-pointer transition transform hover:scale-105 hover:shadow-2xl border border-gray-200 hover:border-blue-500 duration-300"
    >
      {/* Product Image */}
      <div className="relative" onClick={onClick}>
        <img
          src={product.image_front_url || "https://via.placeholder.com/150"}
          alt={product.product_name || "Product Image"}
          className="w-full h-44 object-cover rounded-lg shadow-md"
        />
        {/* Floating Badge */}
        <span className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
          {product.nutrition_grade_tags?.[0]?.toUpperCase() || "N/A"}
        </span>
      </div>

      {/* Product Details */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.product_name || "No Name"}
        </h3>
        <p className="text-gray-500 text-sm">{product.brands || "Unknown Brand"}</p>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-3">
          {/* View Details Button */}
          <button
            onClick={onClick}
            className="bg-gradient-to-r from-gray-500 to-gray-500 hover:from-gray-600 hover:to-gray-600 text-white px-4 py-2 rounded-full transition duration-300 transform hover:scale-105 shadow-md"
          >
            View Details
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="bg-[#5cc2b1] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#4d6159] transition"
          >
            ➕ Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
