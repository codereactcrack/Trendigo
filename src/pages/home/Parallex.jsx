import React from 'react';
import home from '../../assets/home_page/home.jpg';
import foreground from '../../assets/home_page/foreground.png';
import './css/Parallex.css';
import { useNavigate } from 'react-router-dom';

const Parallex = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="container" onClick={() => navigate('/shop')}>
        <img src={home} className="background" alt="Background" />
        <img src={foreground} className="foreground" alt="Foreground" />
        <h1 className='heading-parallex'>TRENDIGO</h1>
      </div>

      <div className="sect">
        <div onClick={() => navigate('/shop/category/men')}>
          <h2 className="sect-head">MEN</h2>
          <p className="text">
            Discover the latest trends in men's fashion with our curated collection. 
            From casual wear to formal attire, we provide stylish options for every occasion. 
            Stay ahead of the fashion curve with our exclusive designs and premium quality.
          </p>
        </div>
        <div className="bg bg1" onClick={() => navigate('/shop/category/women')}>
          <h2 className="desc">WOMEN
          </h2>
        </div>
        <div  onClick={() => navigate('/shop/category/furniture')}>
          <h2 className="sect-head">FURNITURE</h2>
          <p className="text">
            Transform your living space with our elegant furniture pieces. Our collection ranges from modern to classic designs, ensuring you find the perfect fit for your home. Experience comfort and style with our top-notch craftsmanship.
          </p>
        </div>
        <div className="bg bg2" onClick={() => navigate('/shop/category/beauty')}>
          <h2 className="desc">BEAUTY</h2>
        </div>
        <div onClick={() => navigate('/shop/category/electronics')}>
          <h2 className="sect-head" >ELECTRONICS</h2>
          <p className="text">
            Upgrade your tech game with our latest electronics. Whether it's cutting-edge gadgets, home appliances, or personal devices, we have everything you need to stay connected and efficient. Explore our range for innovative solutions.
          </p>
        </div>
        <div className="bg bg3" onClick={() => navigate('/shop/category/others')}>
          <h2 className="desc">OTHERS</h2>
        </div>
      </div>
    </div>
  );
};

export default Parallex;
