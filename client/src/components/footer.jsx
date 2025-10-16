import React from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======

>>>>>>> 0efcc0427904152055fbfdf7b96a273b7f704224
import './footer.css';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';


const Footer = () => {
<<<<<<< HEAD
  const navigate = useNavigate();

=======
>>>>>>> 0efcc0427904152055fbfdf7b96a273b7f704224
  return (
    <div className='footer'>
      <div className='container'>
        <div className='right_box'>
        
          <div className='bottom'>
            <div className='box'>
<<<<<<< HEAD
               <button
                className="footer-btn"
                onClick={() => navigate("/about")}
              >
                About Us
              </button>
              
=======
              <h3>About Us</h3>
>>>>>>> 0efcc0427904152055fbfdf7b96a273b7f704224
              <ul>
                <li>Our Story</li>
                <li>Blog</li>
                <li>FAQs</li>
                <li>Careers</li>
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
           <div className='box'>
              <h3>Sociala Medier</h3>
              <ul className='social-icons'>
                <li><a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a></li>
              </ul>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
