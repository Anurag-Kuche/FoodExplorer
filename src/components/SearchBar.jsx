import React, { useState } from "react";

const SearchBar = ({ setQuery }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setQuery(input);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between bg-white shadow-lg rounded-full overflow-hidden px-3 py-2 border border-gray-300 max-w-lg mx-auto transition duration-300 focus-within:border-blue-500"
    >
      {/* Search Icon */}
      <span className="text-gray-500 px-2">
        🔍
      </span>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search food products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-3 py-2 text-gray-700 focus:outline-none"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-gray-500 to-gray-500 hover:from-gray-600 hover:to-gray-600 text-white px-5 py-2 rounded-full transition duration-300 transform hover:scale-105"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
