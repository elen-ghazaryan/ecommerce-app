import express from "express";
import { 
  getCartByUser, 
  addToCart, 
  updateCartItem, 
  removeCartItem, 
  clearCart 
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCartByUser);                 // View cart
router.post("/:userId/add", addToCart);               // Add item
router.put("/:userId/update", updateCartItem);        // Update quantity
router.delete("/:userId/remove/:productId", removeCartItem); // Remove item
router.delete("/:userId/clear", clearCart);           // Clear cart

export default router;
