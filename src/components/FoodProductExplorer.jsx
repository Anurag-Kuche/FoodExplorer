import React, { useState, useEffect } from "react";
import axios from "axios";


const API_BASE_URL = "https://world.openfoodfacts.org";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    let url = `${API_BASE_URL}/search.pl?search_terms=${searchTerm}&json=true`;
    if (category) url = `${API_BASE_URL}/category/${category}.json`;
    
    try {
      const response = await axios.get(url);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories.json`);
      setCategories(response.data.tags.slice(0, 10));
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Food Product Explorer</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          className="border p-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" onClick={fetchProducts}>Search</button>
      </div>
      <select className="border p-2" onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <img src={product.image_url} alt={product.product_name} className="w-full h-40 object-cover" />
            <h2 className="font-bold text-lg">{product.product_name}</h2>
            <p className="text-sm">Category: {product.categories}</p>
            <p className="text-sm">Nutrition Grade: {product.nutrition_grades}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;