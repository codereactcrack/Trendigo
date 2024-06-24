import React from 'react';
import home from '../../assets/home_page/home.jpg';
import foreground from '../../assets/home_page/foreground.png';
import './css/Parallex.css';
import { useNavigate } from 'react-router-dom';

const Parallex = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="container">
        <img src={home} className="background" alt="Background" />
        <img src={foreground} className="foreground" alt="Foreground" />
        <h1>TRENDIGO</h1>
        <button className="shop-button" onClick={() => navigate('/shop')}>SHOP</button>
      </div>

      <div className="sect">
        <h2 className="sect-head">MEN</h2>
        <p className="text">
          Discover the latest trends in men's fashion with our curated collection. From casual wear to formal attire, we provide stylish options for every occasion. Stay ahead of the fashion curve with our exclusive designs and premium quality.
        <button className="shop-button" onClick={() => navigate('/shop')}>SHOP</button>
        </p>
        <div className="bg bg1">
          <h2 className="desc">WOMEN
          <button className="shop-button" onClick={() => navigate('/shop')}>SHOP</button>
          </h2>
        </div>

        <h2 className="sect-head">FURNITURE</h2>
        <p className="text">
          Transform your living space with our elegant furniture pieces. Our collection ranges from modern to classic designs, ensuring you find the perfect fit for your home. Experience comfort and style with our top-notch craftsmanship.
          <button className="shop-button" onClick={() => navigate('/shop')}>SHOP</button>
        </p>
        <div className="bg bg2">
          <h2 className="desc">BEAUTY
            <button className="shop-button" onClick={() => navigate('/shop')}>SHOP</button>
          </h2>
        </div>

        <h2 className="sect-head">ELECTRONICS</h2>
        <p className="text">
          Upgrade your tech game with our latest electronics. Whether it's cutting-edge gadgets, home appliances, or personal devices, we have everything you need to stay connected and efficient. Explore our range for innovative solutions.
            <button className="shop-button" onClick={() => navigate('/shop')}>SHOP</button>
        </p>
        <div className="bg bg3">
          <h2 className="desc">OTHERS
            <button className="shop-button" onClick={() => navigate('/shop')}>SHOP</button>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Parallex;
