import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext";
import "../../styles/orderHistory.css"

export default function OrderHistory() {
  const { userId } = useCart();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3001/api/orders/${userId}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [userId]);

  if (orders.length === 0) return <p className="empty-history">No orders yet.</p>;

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>Order ({order.status})</h3>
          <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
          <ul>
            {order.items.map(i => (
              <li key={i.productId}>
                {i.productName} x {i.quantity} = ${(i.price * i.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="total">Total: ${order.totalAmount}</p>
          <p className="shipping">Shipping: {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
        </div>
      ))}
    </div>
  );
}
