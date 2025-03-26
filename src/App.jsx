import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";

const apiUrl =
  "https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&fields=product_name,brands,image_front_url,ingredients_text";

function App() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch food products
  const fetchFoodProducts = async (searchQuery) => {
    setLoading(true);
    try {
      const url = `${apiUrl}&search_terms=${searchQuery}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Fetch default category when site loads
  useEffect(() => {
    fetchFoodProducts("snacks"); // Default items (change this category if needed)
  }, []);

  // Fetch new items when user searches
  useEffect(() => {
    if (query) {
      fetchFoodProducts(query);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🍽️ Food Product Explorer
        </h2>

        {/* Search Bar */}
        <SearchBar setQuery={setQuery} />

        {/* Loader */}
        {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.length > 0 ? (
            products.map((item, index) => <ProductCard key={index} product={item} />)
          ) : (
            !loading && <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
