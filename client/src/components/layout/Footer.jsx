import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-contact">
          <p>
            <FontAwesomeIcon icon={faLocationDot} /> 123 Main St, Yerevan
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> +374 00 000000
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> info@example.com
          </p>
        </div>

        <div className="footer-about">
          <h4>About the company</h4>
          <p>
            Welcome to MyShop, your trusted destination for the latest
            electronics, computers, and accessories. We believe technology
            should be accessible to everyone, which is why we focus on offering
            high-quality products at affordable prices. Our goal is not only to
            provide great products, but also to deliver an easy and enjoyable
            shopping experience.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFacebookSquare} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faInstagramSquare} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </div>
    </footer>
  );
};
