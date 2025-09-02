import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataPath = path.join(__dirname, "../data/products.json")

//Get all products
export const getAllProducts = async (req, res) => {
    try {
        const data = await fs.readFile(dataPath, "utf-8");
        const products = JSON.parse(data);
        res.json(products)
    } catch(err) {
        res.status(500).json({message: "Error readingt products data", error})
    }   
}


//Get product by ID
export const getProductById = async (req, res) => {
    try {
        const data = await fs.readFile(dataPath, "utf-8");
        const products = JSON.parse(data);
        const product = products.find(p => p.id == req.params.id);
        if(!product) return res.status(404).json({ message: "Product not found" });
        res.json(product)
    } catch(error) {
        res.status(500).json({ message: "Error reading products data", error })
    }    
}