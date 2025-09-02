import express from "express";
import { createOrder, getOrdersByUser } from "../controllers/orderController.js";

const router = express.Router();

//Routes
router.post("/", createOrder);  //create a new order
router.get("/:userId", getOrdersByUser)   //get user's order

export default router;