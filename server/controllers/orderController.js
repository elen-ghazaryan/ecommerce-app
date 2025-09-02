import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ordersPath = path.join(__dirname, "../data/orders.json");
const cartsPath = path.join(__dirname, "../data/carts.json");
const productsPath = path.join(__dirname, "../data/products.json");

const readJSON = async (filePath) =>
  JSON.parse(await fs.readFile(filePath, "utf-8"));
const writeJSON = async (filePath, data) =>
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { userId, shippingAddress } = req.body;

    // Read all data
    const carts = await readJSON(cartsPath);
    const products = await readJSON(productsPath);
    const orders = await readJSON(ordersPath);

    // Find the cart for the user
    const cart = carts.find((c) => c.userId === userId);
    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }


       //Stock check
    for (const item of cart.items) {
      const product = products.find(
        (p) => p.id == item.productId)
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product ${item.productId} not found.` });
      }
      if (item.quantity > (product.quantity || 0)) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.name}.` });
      }
    }

   //order item
   const orderItems = cart.items.map(item => {
  const product = products.find(p => p.id.toString() === item.productId.toString());
  return {
    productId: product.id,
    productName: product.name,
    quantity: item.quantity,
    price: product.price
  };
});


// Decrease stock after validation
for (const item of cart.items) {
  const product = products.find(p => p.id == item.productId);
  product.quantity -= item.quantity;
}

   


    if (!orderItems.length) {
      return res.status(400).json({ message: "No valid products in cart" });
    }

    // Create order
    const order = {
      id: (orders.length + 1).toString(),
      userId,
      items: orderItems,
      totalAmount: cart.totalAmount,
      status: "pending",
      orderDate: new Date().toISOString(),
      shippingAddress,
    };

    orders.push(order);

    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;

    // Save all
    await writeJSON(ordersPath, orders);
    await writeJSON(cartsPath, carts);
    await writeJSON(productsPath, products);

    res.json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Get user's orders
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await readJSON(ordersPath);
    const userOrders = orders.filter((o) => o.userId === req.params.userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: "Error reading orders", error });
  }
};
