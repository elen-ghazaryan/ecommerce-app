import { useCart } from "../cart/CartContext";
import "../../styles/orderSummary.css"

export default function OrderSummary() {
  const { cart } = useCart();

  if (!cart || cart.items.length === 0) return <p className="empty">No order summary. Your cart is empty.</p>;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <ul>
        {cart.items.map(item => (
          <li key={item.productId}>
            {item.productName} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total: ${cart.totalAmount.toFixed(2)}</p>
    </div>
  );
}
