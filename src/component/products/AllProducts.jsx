import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './css/AllProducts.css';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
  const [list, setList] = useState([]);
  const productCollectionRef = collection(db, 'product-list');
  const naviagte = useNavigate();
  useEffect(() => {
    const unsub = onSnapshot(productCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setList(data);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="product-list">
      {list.map((data) => (
        <div key={data.id} className="product-card" onClick={()=>naviagte(`/shop/${data.id}`)}>
          <div className="product-image">
            {data.images.map((item, index) => (
              <img key={index} src={item} alt="Product" />
            ))}
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
