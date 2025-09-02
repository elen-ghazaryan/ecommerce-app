import { useCart } from "./CartContext";
import CartItem from "./CartItem";
import "../../styles/cart.css";

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.items.map(item => (
          <CartItem 
            key={item.productId} 
            item={item} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart} 
          />
        ))
      )}
      {cart.items.length > 0 && (
        <>
          <h3 className="cart-total">Total: ${cart.totalAmount.toFixed(2)}</h3>
          <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};
