import React from 'react'
import { MdDeliveryDining } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import './nav.css'
import logo from "../assets/restaurant1.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Nav = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <>
      < div className='header'>
        <div className="top-header">
          <div className="icon">
            <MdDeliveryDining />
          </div>
          <div className="info">
            <p>Place your order it will be next to your door</p>
          </div>
        </div>
        <div className="mid-header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="search-box">
            <input type="text" value="" placeholder="Search for recipes..." />
            <button><GoSearch /></button>
          </div>
          {isAuthenticated ?
            <div className="user">
              <div className="icon">
                <FiLogOut />

              </div>
              <div className="btn">
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
              </div>
            </div> :
            <div className="user">
              <div className="icon">
                <FiLogIn />
              </div>
              <div className="btn">
                <button onClick={() => loginWithRedirect()}>Login</button>
              </div>
            </div>
          }
        </div>
        <div className="last-header">
          <div className="user-profile">
            {
              isAuthenticated ?
                <>
                  <div className="icon">
                    <FaRegUser />
                  </div>
                  <div className="info">
                    <h2>{user.nickname}</h2>
                    <p>{user.email}</p>
                  </div>
                </>
                :
                <>
                  <div className="icon">
                    <FaRegUser />
                  </div>
                  <div className="info">
                    <p>please login</p>
                  </div>
                </>
            }

          </div>
          <div className="nav">
            <ul>
              <li><Link to="/" className="link">Home</Link></li>
              <li><Link to="/recipes" className="link">Recipes</Link></li>
              <li><Link to="/categories" className="link">Category</Link></li>
              <li><Link to="/about" className="link">About</Link></li>
              <li><Link to="/contact" className="link">Contact</Link></li>

            </ul>
          </div>
          <div className="offer">
            <p>50 % offer on your first order!</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav
