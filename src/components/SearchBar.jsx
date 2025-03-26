import React, { useState } from "react";

const SearchBar = ({ setQuery }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(input);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-white shadow-md rounded-lg overflow-hidden"
    >
      <input
        type="text"
        placeholder="Search food products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
      >
        🔍 Search
      </button>
    </form>
  );
};

export default SearchBar;
