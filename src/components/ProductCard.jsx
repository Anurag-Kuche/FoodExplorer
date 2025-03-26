const ProductCard = ({ product }) => {
    return (
      <div className="border p-4 rounded shadow-md">
        <img src={product.image_url} alt={product.product_name} className="w-32 h-32 object-cover mx-auto" />
        <h3 className="text-lg font-semibold mt-2">{product.product_name}</h3>
        <p>Category: {product.categories}</p>
        <p>Nutrition Grade: {product.nutrition_grades}</p>
      </div>
    );
  };
  
  export default ProductCard;
  