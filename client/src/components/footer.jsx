import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";


const Footer = () => {

  const navigate = useNavigate();
  const [showSocial, setShowSocial] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Navigation Buttons */}
        <div className="footer-buttons">
          <button onClick={() => navigate("/about")}>Om oss</button>
          <button onClick={() => navigate("/contact")}>Kontakt</button>

          {/* Sociala Medier Button */}
          <div className="social-button-container">
            <button
              className="social-button"
              onClick={() => setShowSocial(!showSocial)}
            >
              Sociala Medier
            </button>

            {showSocial && (
              <div className="social-list-vertical">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                  <FaYoutube />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} RecipeHub. Alla rättigheter förbehållna.
      </p>

    </footer>
  );
};

export default Footer;
