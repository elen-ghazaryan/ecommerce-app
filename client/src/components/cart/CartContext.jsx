import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState({
    userId,
    items: [],
    totalAmount: 0,
    createdAt: new Date().toISOString(),
  });


  // Step 1: generate or load userId
  useEffect(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);
    setCart((prev) => ({ ...prev, userId: storedId })); // update cart.userId
  }, []);

  // Step 2: fetch cart only when userId is ready
  useEffect(() => {
    fetch(`http://localhost:3001/api/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, [userId]);

  const getAvailableStock = (product) => {
    const cartItem = cart.items.find(item => item.productId == product.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;
    
    const available = product.quantity - quantityInCart;
    return Math.max(0, available); 
};

//clear cart after order
const clearCartAfterOrder = () => {
  setCart(prev => ({
    ...prev,
    items: [],
    totalAmount: 0
  }));
};

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
       const availableStock = getAvailableStock(product);

      if (quantity > availableStock) {
      alert(`Only ${availableStock} items available. You already have some in your cart.`);
      return;
    }

      const res = await fetch(`http://localhost:3001/api/cart/${userId}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          imageUrl: product.imageUrl,
          quantity,
          price: product.price,
        }),
      });

      // Check if the response is successful
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add product to cart");
      }

      const updatedCart = await res.json();
      setCart(updatedCart); // backend returns the whole cart

    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // Update item quantity
 const updateQuantity = async (productId, quantity) => {
  try {
    const res = await fetch(`http://localhost:3001/api/cart/${userId}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) {
      const errorData = await res.json(); 
      throw new Error(errorData.message);
    }

    const updatedCart = await res.json();
    setCart(updatedCart);
  } catch (err) {
    console.error("Update quantity error:", err);
    alert(err.message)
  }
};

  // Remove item
  const removeFromCart = async (productId) => {
    const res = await fetch(
      `http://localhost:3001/api/cart/${userId}/remove/${productId}`,
      {
        method: "DELETE",
      }
    );

    const updatedCart = await res.json();
    setCart(updatedCart);
  };

  // Clear cart
  const clearCart = async () => {
    const res = await fetch(`http://localhost:3001/api/cart/${userId}/clear`, {
      method: "DELETE",
    });

    const updatedCart = await res.json();
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        userId,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getAvailableStock,
        clearCartAfterOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
