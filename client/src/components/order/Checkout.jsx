import { useState } from "react";
import { useCart } from "../cart/CartContext";
import "../../styles/checkout.css";

export default function Checkout() {
  const { userId, cart, setCart, clearCartAfterOrder } = useCart();
  
  
  const [shipping, setShipping] = useState({
    street: "",
    city: "",
    zipCode: "",
  });
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          shippingAddress: shipping,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If backend returns error, show it
        console.error("Order error:", data);
        alert("Failed to create order: " + data.message);
        return;
      }

      //success
      clearCartAfterOrder()
      setOrder(data);
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error while creating order");
    }
  };

 if (order) {
  return (
    <div className="order-success">
      <h2>Order placed successfully!</h2>
      <p>Your order #{order.id} is {order.status}.</p>

      <h3>Items:</h3>
      <ul>
        {order.items.map((item) => (
          <li key={item.productId}>
            {item.productName} x {item.quantity} = ${(
              item.price * item.quantity
            ).toFixed(2)}
          </li>
        ))}
      </ul>

      <p>
        <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
      </p>

      <p>
        <strong>Shipping to:</strong> {order.shippingAddress.street},{" "}
        {order.shippingAddress.city}, {order.shippingAddress.zipCode}
      </p>
    </div>
  );
}

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <input
        type="text"
        placeholder="Street"
        value={shipping.street}
        onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={shipping.city}
        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Zip Code"
        value={shipping.zipCode}
        onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })}
        required
      />
      <button type="submit">Place Order</button>
    </form>
  );
}
