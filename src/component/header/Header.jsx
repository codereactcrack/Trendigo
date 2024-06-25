import React, { useState } from 'react';
import Logo from '../../assets/images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './css/Header.css';

const Header = () => {

    const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__logo" onClick={()=>navigate('/')}>
        <img src={Logo} alt="Logo" />
      </div>
      <div className="header__navigation">
        <ul className="header__nav-list">
          <li><NavLink to="/home" activeClassName="active">HOME</NavLink></li>
          <li><NavLink to="/shop" activeClassName="active">SHOP</NavLink></li>
          <li><NavLink to="/about-us" activeClassName="active">ABOUT US</NavLink></li>
          <li><NavLink to="/contact-us" activeClassName="active">CONTACT US</NavLink></li>
        </ul>
      </div>
      <div className="header__search-bar">
        <SearchIcon className="header__search-icon" />
        <input type="text" placeholder="Search Item.." className="header__search-input" />
      </div>
      <div className="header__auth-bar">
        <div className="header__icon">
            <NavLink to="/profile" activeClassName="active"><AccountCircleRoundedIcon /></NavLink>
        </div>
        <div className="header__icon">
            <NavLink to="/wishlist" activeClassName="active"><FavoriteBorderOutlinedIcon /></NavLink>
        </div>
        <div className="header__icon">
            <NavLink to="/cart" activeClassName="active"><ShoppingCartOutlinedIcon /></NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
