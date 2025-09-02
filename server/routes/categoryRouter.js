import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const categoriesPath = path.join(__dirname, "../data/categories.json");

router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(categoriesPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ message: "Error reading categories", err });
  }
});

export default router;
