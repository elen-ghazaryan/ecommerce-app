import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "../../styles/header.css";
import { Link } from "react-router-dom";

export const Header = ({ isOpen, setIsOpen }) => {
  return (
    <header className="header">
      <div className="header-background">
        <p>WHERE INNOVATION MEETS YOU</p>
      </div>

      <div className="bottom-navigator">
        <h2>
          <Link to="/" className="logo">Technova</Link>
        </h2>

         <nav className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/order-summary">Order Summary</Link>
          <Link to="/orders">Order History</Link>
        </nav>
        
        <div className="navigator-icon">
          <ShoppingBagIcon onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>
    </header>
  );
};
