import React, { useContext } from 'react';
import useFetchCollection from '../../hooks/useFetchCollection';
import UserContext from '../../context/AuthContext/UserContext';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import '../../component/products/css/AllProducts.css';
import './css/Wishlist.css'
import toast from 'react-hot-toast';


const Wishlist = () => {
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

  const wishListItems = productList.filter(product => 
    findUser.wishListItems.includes(product.id)
  );

  const removeWishListHandler = async (productid) => {
    const wishlist = findUser.wishListItems;
    const updatedWishlist = wishlist.filter(data => data !== productid);
    const docRef = doc(db, 'users', findUser.id);

    try {
      await updateDoc(docRef, {
        wishListItems: updatedWishlist
      });
      toast.success('Removed from WishList')
    } catch (error) {
      toast.error('Error removing item from wishlist')
      console.error('Error removing item from wishlist: ', error);
    }
  };

  const addtoCartHandler =async (productid) => {
    const cartList = findUser.cartItems;
    const docRef = doc(db, 'users', findUser.id);
    try {
      await updateDoc(docRef, {
        cartItems: arrayUnion(...cartList,productid)
      });
      toast.success('Added to Cart')
    } catch (error) {
      toast.error('Error in adding item from cart')
      console.error('Error in adding item from cart ', error);
    }
  };

  return (
    <div>
      <div className='wishlist-heading'>Wishlist</div>
      <div className="product-list">
        {wishListItems.map(data => (
          <div key={data.id} className="product-card">
            <div className="product-image" onClick={() => navigate(`/shop/${data.id}`)}>
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
                <button className="remove-button" onClick={() => removeWishListHandler(data.id)}>
                  REMOVE
                </button>
                <button className="cart-button" onClick={() => addtoCartHandler(data.id)}>
                  ADD TO CART 
                <ShoppingCartCheckoutIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
