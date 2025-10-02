import React from 'react';
import { FaLeaf, FaShippingFast, FaUtensils, FaWallet } from 'react-icons/fa';
import './footer.css';
import logo from "../assets/restaurant.jpeg";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        
        {/* Left Box - Features */}
        <div className='left_box'>
          <div className='box'>
            <div className='icon_box'>
              <FaLeaf />
            </div>
            <div className='detail'>
              <h3>Fresh Ingredients</h3>
              <p>Recipes with healthy and fresh ingredients</p>
            </div>
          </div>
          <div className='box'>
            <div className='icon_box'>
              <FaShippingFast />
            </div>
            <div className='detail'>
              <h3>Fast Delivery</h3>
              <p>Get your order delivered quickly</p>
            </div>
          </div>
          <div className='box'>
            <div className='icon_box'>
              <FaUtensils />
            </div>
            <div className='detail'>
              <h3>Easy to Cook</h3>
              <p>Step-by-step instructions for everyone</p>
            </div>
          </div>
          <div className='box'>
            <div className='icon_box'>
              <FaWallet />
            </div>
            <div className='detail'>
              <h3>Affordable Meals</h3>
              <p>Enjoy delicious recipes without overspending</p>
            </div>
          </div>
        </div>

        {/* Right Box - Info */}
        <div className='right_box'>
          <div className='header'>
            <img src={logo} alt='Recipe Logo' />
            <p>Your go-to platform for tasty and easy recipes.</p>
          </div>
          <div className='bottom'>
            <div className='box'>
              <h3>About</h3>
              <ul>
                <li>Our Story</li>
                <li>Blog</li>
                <li>FAQs</li>
                <li>Careers</li>
              </ul>
            </div>
            <div className='box'>
              <h3>Recipes</h3>
              <ul>
                <li>Breakfast</li>
                <li>Lunch</li>
                <li>Dinner</li>
                <li>Desserts</li>
              </ul>
            </div>
            <div className='box'>
              <h3>Contact Us</h3>
              <ul>
                <li>123 Recipe Street, Food City</li>
                <li>+(012) 345-6789</li>
                <li>support@recipesite.com</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
