import React, { useState } from 'react';
import { FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import './nav.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Nav = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className='header'>
        <div className="nav-bar">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-text" onClick={closeMenu}>RecipeHub</Link>
          </div>

          {/* Hamburger Icon */}
          <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>

          {/* Navigation Links */}
          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li><Link to="/" className="link" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/recipes" className="link" onClick={closeMenu}>Recipes</Link></li>
            <li><Link to="/categories" className="link" onClick={closeMenu}>Category</Link></li>
            <li><Link to="/about" className="link" onClick={closeMenu}>About</Link></li>
            <li><Link to="/contact" className="link" onClick={closeMenu}>Contact</Link></li>
          </ul>

          {/* Auth Buttons */}
          <div className="auth-btn">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout({ logoutParams: { returnTo: window.location.origin } });
                  closeMenu();
                }}
              >
                <FiLogOut style={{ marginRight: '5px' }} /> Logout
              </button>
            ) : (
              <button onClick={() => {
                loginWithRedirect();
                closeMenu();
              }}>
                <FiLogIn style={{ marginRight: '5px' }} /> Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
