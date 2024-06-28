import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import useFetchCollection from '../../hooks/useFetchCollection'
import useAddWishList from '../../hooks/useAddWishList';
import useAddCart from '../../hooks/useAddCart';
import '../../component/products/css/AllProducts.css'
import './css/FeaturedProduct.css'
import UserContext from '../../context/AuthContext/UserContext';

const FeaturedProduct = () => {

  const productList = useFetchCollection('product-list');
  const userList = useFetchCollection('users');
  const {currentUser} = useContext(UserContext)
  const featuredList = productList.filter( data=> data.featured === true)
  const naviagte = useNavigate();

  const addWishListItem = useAddWishList();
  const addtoWishListHandler = async (id) => {
    await addWishListItem(id);
  }

  const addCartItem = useAddCart();
  const addtoCartHandler = async (id) => {
    await addCartItem(id);
  };

    // Finding the current user's wishlist
    const user = userList.find(user => user.userEmail === currentUser.email);
    const wishlist = user ? user.wishListItems : [];

  return (
    <div>
       <h2 className='feautured-product-heading'>MEDAL WORTHY PRODUCTS TO BAG</h2>
        <div className="product-list">
          {featuredList.map((data) => (
            <div key={data.id} className="product-card" onClick={()=>naviagte(`/shop/${data.id}`)}>
              <div className="product-image" >
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
                <button  className="wishlist-button" 
                   onClick={(e) => { e.stopPropagation(); addtoWishListHandler(data.id); }}>
                  <FavoriteIcon style={{ color: wishlist.includes(data.id) ? 'red' : '#4287f5' }} />
                </button>
                <button className="cart-button" onClick={(e)=>{e.stopPropagation(); addtoCartHandler(data.id)}}>ADD TO CART <ShoppingCartCheckoutIcon /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default FeaturedProduct