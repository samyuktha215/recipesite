import React, { useState } from 'react';
import { FiLogIn, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import './nav.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const isPreview = import.meta.env.VITE_NETLIFY_CONTEXT !== 'production';

const Nav = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogin = () => {
    if (isPreview) {
      console.log('Preview login simulated');
    } else {
      loginWithRedirect();
    }
    closeMenu();
  };

  const handleLogout = () => {
    if (isPreview) {
      console.log('Preview logout simulated');
    } else {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
    closeMenu();
  };

  return (
    <div className="header">
      <div className="nav-bar">
        <div className="logo">
          <Link to="/" className="logo-text" onClick={closeMenu}>
            Receptsida
          </Link>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" className="link" onClick={closeMenu}>Hem</Link></li>
          <li><Link to="/category" className="link" onClick={closeMenu}>Kategorier</Link></li>
          <li><Link to="/about" className="link" onClick={closeMenu}>Om</Link></li>
          <li><Link to="/contact" className="link" onClick={closeMenu}>Kontakt</Link></li>
        </ul>

        <div className="auth-btn">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout}>
                <FiLogOut style={{ marginRight: '5px' }} /> Logga ut
              </button>
              <span style={{ marginLeft: '10px' }}>
                Hej, {user?.name || user?.email || 'Preview User'}
              </span>
            </>
          ) : (
            <button onClick={handleLogin}>
              <FiLogIn style={{ marginRight: '5px' }} /> Logga in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
