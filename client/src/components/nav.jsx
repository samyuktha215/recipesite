import React, { useState, useEffect } from 'react';
import { FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import './nav.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Nav = () => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Function to call your protected backend API
  const callProtectedAPI = async () => {
    try {
      const token = await getAccessTokenSilently(); // Get Auth0 access token
      const response = await fetch("${import.meta.env.VITE_API_URL}/protected", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data.user); // store user data from backend
      console.log("Backend response:", data);
    } catch (err) {
      console.error("Error calling protected API:", err);
    }
  };

  // Call protected API automatically when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      callProtectedAPI();
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className='header'>
        <div className="nav-bar">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-text" onClick={closeMenu}>Receptsida</Link>
          </div>

          {/* Hamburger Icon */}
          <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>

          {/* Navigation Links */}
          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li><Link to="/" className="link" onClick={closeMenu}>Hem</Link></li>
            <li><Link to="/category" className="link" onClick={closeMenu}>Kategorier</Link></li>
            <li><Link to="/about" className="link" onClick={closeMenu}>Om</Link></li>
            <li><Link to="/contact" className="link" onClick={closeMenu}>Kontakt</Link></li>
          </ul>

          {/* Auth Buttons */}
          <div className="auth-btn">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                    closeMenu();
                  }}
                >
                  <FiLogOut style={{ marginRight: '5px' }} /> Logga ut
                </button>
                {userData && <span style={{ marginLeft: '10px' }}>Hej, {userData.name || userData.email}</span>}
              </>
            ) : (
              <button onClick={() => { loginWithRedirect(); closeMenu(); }}>
                <FiLogIn style={{ marginRight: '5px' }} /> Logga in
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
