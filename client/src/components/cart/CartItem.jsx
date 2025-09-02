import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "../../styles/cart.css";

export default function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <div className="cart-item">
      <img 
        src={item.imageUrl} 
        alt={item.productName} 
        className="cart-img"
      />
      <div className="cart-details">
        <p>{item.productName}</p>
        <p>{item.quantity} × ${item.price.toFixed(2)}</p>
        <div className="cart-actions">
          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
          <button 
            disabled={item.quantity < 2} 
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          >
            -
          </button>
          <button onClick={() => removeFromCart(item.productId)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}
