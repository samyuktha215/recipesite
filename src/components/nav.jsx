import React from 'react'
import { GoSearch } from "react-icons/go";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import './nav.css'
import logo from "../assets/restaurant.jpeg";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Nav = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <>
      <div className='header'>
        <div className="top-header">
          <div className="user-profile">
            {isAuthenticated ? (
              <>
                <div className="icon">
                  <FaRegUser />
                </div>
                <div className="info">
                  <h2>{user.nickname}</h2>
                  <p>{user.email}</p>
                </div>
              </>
            ) : (
              <>
                <div className="icon">
                  <FaRegUser />
                </div>
                <div className="info">
                  <p>Please login</p>
                </div>
              </>
            )}
          </div>
          <div className="offer">
            <p>check your favorite recipe!</p>
          </div>
        </div>

        {/* Navigation bar now contains logo, links, search, and login/logout */}
        <div className="nav-bar">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          <ul className="nav-links">
            <li><Link to="/" className="link">Home</Link></li>
            <li><Link to="/recipes" className="link">Recipes</Link></li>
            <li><Link to="/categories" className="link">Category</Link></li>
            <li><Link to="/about" className="link">About</Link></li>
            <li><Link to="/contact" className="link">Contact</Link></li>
          </ul>

          <div className="search-box">
            <input type="text" placeholder="Search for recipes..." />
            <button><GoSearch /></button>
          </div>

          <div className="auth-btn">
            {isAuthenticated ? (
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                <FiLogOut style={{ marginRight: '5px' }} /> Logout
              </button>
            ) : (
              <button onClick={() => loginWithRedirect()}>
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
