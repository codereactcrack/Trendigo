import React, { useContext } from 'react';
import useFetchCollection from '../../hooks/useFetchCollection';
import UserContext from '../../context/AuthContext/UserContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import './css/Cart.css';
import toast from 'react-hot-toast';
import CartPrice from './CartPrice';

const Cart = () => {
  const productList = useFetchCollection('product-list');
  const userList = useFetchCollection('users');
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!productList || !userList || !currentUser) {
    return <div>Loading...</div>;
  }

  const findUser = userList.find(data => data.userEmail === currentUser.email);
  if (!findUser) {
    return <div>User not found</div>;
  }

  const cartItems = productList.filter(product => 
    findUser.cartItems.includes(product.id)
  );

  const removeCartHandler = async (productId) => {
    const cartList = findUser.cartItems;
    const updatedCartList = cartList.filter(data => data !== productId);
    const docRef = doc(db, 'users', findUser.id);
    try {
      await updateDoc(docRef, {
        cartItems: updatedCartList
      });
      toast.success('Removed from Cart');
    } catch (error) {
      toast.error('Error removing item from Cart');
      console.error('Error removing item from Cart: ', error);
    }
  };

  return (
    <div className='cart-page'>
      <div className='cart-heading'>Cart</div>
      <div className='cart-box'>
        <div className='cart-container'>
          {cartItems.map(data => (
            <div key={data.id} className='cart-product-card'>
              <div className='cart-product-image' onClick={() => navigate(`/shop/${data.id}`)}>
                <img src={data.images[0]} alt='Product' />
              </div>
              <div className='cart-product-info'>
                <h2 className='cart-product-name'>{data.name}</h2>
                <div className='cart-product-brand'>{data.brand}</div>
                <div className='cart-product-price'>
                  <span>Price: ${data.price}</span>
                  <span>Discount: {data.discount}%</span>
                  <span>Discounted Price: ${data.finalPrice}</span>
                </div>
                <div className='cart-product-actions'>
                  <button className='remove-button' onClick={() => removeCartHandler(data.id)}>Remove From Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='price section'>
          <CartPrice cartValue={cartItems}/>
        </div>
      </div>
    </div>
  );
};

export default Cart;
