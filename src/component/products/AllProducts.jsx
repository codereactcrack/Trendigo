import React, { useContext } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './css/AllProducts.css';
import { useNavigate } from 'react-router-dom';
import useFetchCollection from '../../hooks/useFetchCollection';
import useAddWishList from '../../hooks/useAddWishList';
import useAddCart from '../../hooks/useAddCart';
import SearchContext from '../../context/Search/SearchContext';
import UserContext from '../../context/AuthContext/UserContext';

const AllProducts = () => {
  const { input } = useContext(SearchContext);
  const list = useFetchCollection('product-list');
  const userList = useFetchCollection('users');
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const addWishListItem = useAddWishList();
  const addtoWishListHandler = async (id) => {
    await addWishListItem(id);
  };

  const addCartItem = useAddCart();
  const addtoCartHandler = async (id) => {
    await addCartItem(id);
  };

  // Filtering products based on search input
  const filteredList = input ? list.filter(data => data.name.toLowerCase().includes(input.toLowerCase())) : list;

  // Finding the current user's wishlist
  let user ='';
  if(currentUser) {
    user = userList.find(user => user.userEmail === currentUser.email);
  }
  const wishlist = user ? user.wishListItems : [];

  return (
    <div className="product-list">
      {filteredList.map((data) => (
        <div key={data.id} className="product-card" onClick={() => navigate(`/shop/${data.id}`)}>
          <div className="product-image">
            <img src={data.images[0]} alt="Product" />
          </div>
          <div className="product-info">
            <h2 className="product-name">{data.name}</h2>
            <div className="product-brand">{data.brand}</div>
            <div className="product-price">
              <span>Price: ₹{data.price}</span>
              <span>Discount: {data.discount}%</span>
              <span>Discounted Price: ₹{data.price - (data.price * data.discount) / 100}</span>
            </div>
            <div className="product-actions">
              <button 
                className="wishlist-button" 
                onClick={(e) => { e.stopPropagation(); addtoWishListHandler(data.id); }}>
                <FavoriteIcon style={{ color: wishlist.includes(data.id) ? 'red' : '#4287f5' }} />
              </button>
              <button 
                className="cart-button" 
                onClick={(e) => { e.stopPropagation(); addtoCartHandler(data.id); }}
              >
                Add to Cart <ShoppingCartCheckoutIcon />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
