import { Cart } from "./components/cart/Cart";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ProductList } from "./components/product/ProductList";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderSummary from "./components/order/OrderSummary";
import OrderHistory from "./components/order/OrderHistory";
import Checkout from "./components/order/Checkout";
import { ProductDetail } from "./components/product/ProductDetail";


export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="main-section">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/details/:id" element={<ProductDetail />} />

        </Routes>

        {isOpen && <Cart isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>

      <Footer />
    </Router>
  );
}
