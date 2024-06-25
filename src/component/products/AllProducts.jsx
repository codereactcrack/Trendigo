import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './css/AllProducts.css';
import { useNavigate } from 'react-router-dom';
import useFetchProduct from '../../hooks/useFetchProduct';

const AllProducts = () => {
    
  const list = useFetchProduct();

  const naviagte = useNavigate();

  return (
    <div className="product-list">
      {list.map((data) => (
        <div key={data.id} className="product-card" onClick={()=>naviagte(`/shop/${data.id}`)}>
          <div className="product-image">
            <img src={data.images[0]} alt="Product" />
          </div>
          <div className="product-info">
            <h2 className="product-name">{data.name}</h2>
            <div className="product-brand">{data.brand}</div>
            <div className="product-price">
              <span>PRICE: ${data.price}</span>
              <span>Discount: {data.discount}%</span>
              <span>Discounted Price: ${data.price - (data.price * data.discount) / 100}</span>
            </div>
            <div className="product-actions">
              <button className="wishlist-button"><FavoriteIcon /></button>
              <button className="cart-button">ADD TO CART <ShoppingCartCheckoutIcon /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
