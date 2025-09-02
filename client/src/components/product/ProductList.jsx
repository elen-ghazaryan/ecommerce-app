import React, { useState, useEffect } from "react";
import  { ProductItem }  from "./ProductItem";
import { CategoryFilter } from "./CategoryFilter"; 
import "../../styles/products.css"
import { useCart } from "../cart/CartContext";

export const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");



  // Fetch all products once
  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setProducts(data); // initially show all
      });
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (category) {
      setProducts(allProducts.filter(p => p.category === category));
    } else {
      setProducts(allProducts);
    }
  }, [category, allProducts]);

  return (
    <div>
      <CategoryFilter setCategory={setCategory} selectedCategory={category} />

      <div className="products-section">
        {products.map(product => (
          <ProductItem 
            key={product.id} 
            item={product}
          />
        ))}
      </div>
    </div>
  );
};

