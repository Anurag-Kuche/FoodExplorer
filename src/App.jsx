import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import FilterSortBar from "./components/FilterSortBar";
import ProductModal from "./components/ProductModal";
import Cart from "./components/Cart"; 
import { ClipLoader } from "react-spinners";


const apiUrl =
  "https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&fields=product_name,brands,image_front_url,ingredients_text,nutrition_grade_fr,nutriments,product_quantity,categories";

function App() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("snacks");
  const [sortBy, setSortBy] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]); 
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false); 

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };


  const removeFromCart = (productName) => {
    setCart((prev) => prev.filter((item) => item.product_name !== productName));
  };


  const fetchFoodProducts = async (searchQuery = "", selectedCategory = "snacks", pageNumber = 1, append = false) => {
    setLoading(true);
    try {
      const url = `${apiUrl}&search_terms=${searchQuery}&tagtype_0=categories&tag_contains_0=contains&tag_0=${selectedCategory}&page=${pageNumber}&page_size=10`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.products || data.products.length === 0) {
        setHasMore(false);
      }

      setProducts((prev) => (append ? [...prev, ...data.products] : data.products));
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFoodProducts("", category, 1);
  }, []);


  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchFoodProducts(query, category, 1);
  }, [query, category]);


  const loadMore = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFoodProducts(query, category, nextPage, true);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "name") return (a.product_name || "").localeCompare(b.product_name || "");
    if (sortBy === "nutrition") return (a.nutriments?.["nutrition-score-fr"] || 0) - (b.nutriments?.["nutrition-score-fr"] || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="max-w-5xl mx-auto">
       
        <button
          className="fixed top-6 right-6 bg-gray-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-600 transition flex items-center"
          onClick={() => setIsCartOpen(true)}
        >
          🛒 Cart ({cart.length})
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🍽️ Food Product Explorer</h2>

        <SearchBar setQuery={setQuery} />
        <FilterSortBar category={category} setCategory={setCategory} sortBy={sortBy} setSortBy={setSortBy} />


        {loading && (
  <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 flex justify-center items-center z-50">
    <ClipLoader color="#3B82F6" size={60} />
  </div>
)}

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((item, index) => (
              <ProductCard key={index} product={item} onClick={() => setSelectedProduct(item)} addToCart={addToCart} />
            ))
          ) : (
            !loading && <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>

       
        {hasMore && !loading && (
          <div className="text-center mt-6">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
              onClick={loadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      
      {isCartOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-5 transform transition-transform">
          <button onClick={() => setIsCartOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">
            ✖
          </button>
          <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex items-center border-b py-2">
                  <img src={item.image_front_url || "https://via.placeholder.com/50"} alt={item.product_name} className="w-12 h-12 object-cover rounded" />
                  <div className="ml-3">
                    <p className="text-sm font-semibold">{item.product_name}</p>
                    <p className="text-xs text-gray-500">{item.brands || "Unknown Brand"}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product_name)}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    ⨉ 
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
