import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section footer__about">
          <h3>About Us</h3>
          <p>We are a leading e-commerce website offering a wide range of products to suit all your needs. Our mission is to provide high-quality products at affordable prices.</p>
        </div>
        <div className="footer__section footer__links">
          <h3>Quick Links</h3>
          <ul>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/shop">Shop</NavLink></li>
            <li><NavLink to="/about-us">About Us</NavLink></li>
            <li><NavLink to="/contact-us">Contact Us</NavLink></li>
          </ul>
        </div>
        <div className="footer__section footer__social">
          <h3>Follow Us</h3>
          <div className="footer__social-icons">
            <a href="https://www.instagram.com/codereactcrack" target="_blank" rel="noopener noreferrer"><InstagramIcon/></a>
          </div>
        </div>
        <div className="footer__section footer__contact">
          <h3>Contact Us</h3>
          <p>Email: codereactcrack@gmail.com</p>
          <p>Phone: AVILABLE SOOON</p>
          <p>Address: 123 E-commerce St, Shop City, Country</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; Trendigo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
