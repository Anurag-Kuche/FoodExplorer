import axios from "axios";

const BASE_URL = "https://world.openfoodfacts.org";

export const fetchProductsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/category/${category}.json`);
  return response.data.products;
};

export const searchProductsByName = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/cgi/search.pl?search_terms=${query}&json=true`
  );
  return response.data.products;
};

export const fetchProductByBarcode = async (barcode) => {
  const response = await axios.get(`${BASE_URL}/api/v0/product/${barcode}.json`);
  return response.data.product;
};
