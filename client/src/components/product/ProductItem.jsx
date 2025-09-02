import { Link } from "react-router-dom";
import "../../styles/products.css";
import { AddToCartButton } from "../cart/AddToCartButton";
import { useCart } from "../cart/CartContext";


export const ProductItem = ({ item }) => {
  const { getAvailableStock } = useCart()
  const outOfStock = getAvailableStock(item) === 0
 
  
  return (
    <>
      <div className={`product-item ${outOfStock ? "out-of-stock" : ""}`}>
        <img src={item.imageUrl} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div>
          <div className="product-details">
            <p className="product-item-category">category: {item.category}</p>
            <h4>{item.price} USD</h4>
            <Link to={`/details/${item.id}`}>Details</Link>
          </div>
          <AddToCartButton
            product={item}
          />
        </div>
        {
            outOfStock && <p className="stock">Out Of Stock</p>
        }
      </div>
    </>
  );
};
