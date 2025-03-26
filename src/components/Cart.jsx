import React from "react";

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div className="fixed top-10 right-5 w-80 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-xl font-bold">🛒 Your Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center mt-2 border-b pb-2">
              <span>{item.product_name}</span>
              <button className="text-red-500" onClick={() => removeFromCart(item.product_name)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
