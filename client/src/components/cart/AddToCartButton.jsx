import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../../styles/cart.css";
import { useCart } from "../cart/CartContext";

export const AddToCartButton = ({ product}) => {
  const { addToCart } = useCart();

  return (
    <>
      <AddCircleIcon
        className="add-to-cart"
        onClick={() => addToCart(product)}
      />
      
    </>
  );
};
