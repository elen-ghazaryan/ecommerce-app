import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartsPath = path.join(__dirname, "../data/carts.json");
const productsPath = path.join(__dirname, "../data/products.json");


const readJSON = async (filePath) => {
  const data = await fs.readFile(filePath, "utf-8");
  return data ? JSON.parse(data) : [];
};
const writeJSON = async (filePath, data) => await fs.writeFile(filePath, JSON.stringify(data, null, 2));


export const getCartByUser = async (req, res) => {
  const carts = await readJSON(cartsPath);
  const cart = carts.find(c => c.userId == req.params.userId) || { userId: req.params.userId, items: [], totalAmount: 0 };
  res.json(cart);
};


export const addToCart = async (req, res) => {
  const { productId, productName, imageUrl, quantity, price } = req.body; 
  const carts = await readJSON(cartsPath);
  const products = await readJSON(productsPath);

  let cart = carts.find(c => c.userId === req.params.userId);
  if (!cart) {
    cart = { userId: req.params.userId, items: [], totalAmount: 0 };
    carts.push(cart);
  }

  const item = cart.items.find(i => i.productId === productId);
  if (item) {
    // increase quantity if already in cart
    item.quantity += quantity;
  } else {
    // store productName, imageUrl, price in the cart
    cart.items.push({
      productId,
      productName: productName || product.name,
      imageUrl: imageUrl || product.imageUrl,
      quantity,
      price
    });
  }

  // recalculate total
  cart.totalAmount = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  await writeJSON(cartsPath, carts);
  res.json(cart);
};


// Update item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const carts = await readJSON(cartsPath);
    const products = await readJSON(productsPath);

    const cart = carts.find(c => c.userId === req.params.userId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    const product = products.find(p => p.id.toString() === productId.toString());
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (quantity > product.quantity) {
      return res.status(400).json({message: `Oops! Only ${product.quantity} "${product.name}" are available. Please reduce quantity.` });
    }

    item.quantity = quantity;
    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    await writeJSON(cartsPath, carts);
    res.json(cart);
  } catch (err) {
    console.error("Update cart item error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Remove an item
export const removeCartItem = async (req, res) => {
  const { userId, productId } = req.params;
  const carts = await readJSON(cartsPath);
  const cart = carts.find(c => c.userId === userId);
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.productId !== productId);
  cart.totalAmount = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  await writeJSON(cartsPath, carts);
  res.json(cart);
};

// Clear cart
export const clearCart = async (req, res) => {
  const { userId } = req.params;
  const carts = await readJSON(cartsPath);
  let cart = carts.find(c => c.userId === userId);

  if (!cart) {
    cart = { userId, items: [], totalAmount: 0 };
    carts.push(cart);
  } else {
    cart.items = [];
    cart.totalAmount = 0;
  }

  await writeJSON(cartsPath, carts);
  res.json(cart);
};
