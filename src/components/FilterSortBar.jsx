import React from "react";

const categories = ["snacks", "beverages", "chocolates", "fruits", "dairy"];
const sortOptions = { name: "Alphabetical", nutrition: "Nutrition Score" };

const FilterSortBar = ({ category, setCategory, sortBy, setSortBy }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {/* Category Filter */}
      <select
        className="p-2 border rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* Sorting */}
      <select
        className="p-2 border rounded-lg"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        {Object.entries(sortOptions).map(([key, value]) => (
          <option key={key} value={key}>
            Sort by {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSortBar;
