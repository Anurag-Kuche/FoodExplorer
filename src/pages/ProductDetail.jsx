import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductByBarcode } from "../api/openFoodFacts";

const ProductDetail = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductByBarcode(barcode)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [barcode]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <img src={product.image_url} alt={product.product_name} className="w-64" />
      <h2 className="text-xl font-bold">{product.product_name}</h2>
      <p>{product.ingredients_text}</p>
      <p>Nutrition Score: {product.nutrition_grades}</p>
    </div>
  );
};

export default ProductDetail;
