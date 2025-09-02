import express from "express"
import productRoutes from "./routes/productRouter.js"
import orderRoutes from "./routes/orderRouter.js";
import categoryRoutes from "./routes/categoryRouter.js";
import cartRoutes from "./routes/cartRouter.js";
import cors from "cors";


const app = express();
const PORT = 3001;

app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000"
}));

//Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
    res.send("E-commerce backend is running")
})

app.listen(PORT, () => {
    console.log("server running on port" + PORT)
})