import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import "../../styles/productDetail.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const inStock = product.quantity > 0;

  return (
    <div className="product-detail">
      <a href="/">← Back to Products</a>
      <div className="product-detail-card">
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-detail-category">Category: {product.category}</p>
          <p>{product.description}</p>
          <h3>Price: ${product.price.toFixed(2)}</h3>
          <p>Available Quantity: {product.quantity}</p>
          <p>Status: {inStock ? "In Stock ✅" : "Out of Stock ❌"}</p>
          <button 
            disabled={!inStock} 
            onClick={() => addToCart(product, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
