import React, { useState } from "react";

const BarcodeSearch = ({ onSearch }) => {
  const [barcode, setBarcode] = useState("");

  const handleSearch = () => {
    if (barcode.trim() !== "") {
      onSearch(barcode);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow">
      <input
        type="text"
        placeholder="Enter Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default BarcodeSearch;
