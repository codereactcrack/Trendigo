import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './css/ProductDetails.css';
import useFetchCollection from '../../hooks/useFetchCollection';
import useAddWishList from '../../hooks/useAddWishList';
import useAddCart from '../../hooks/useAddCart';
import UserContext from '../../context/AuthContext/UserContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const list = useFetchCollection('product-list');
  const userList = useFetchCollection('users');
  const { currentUser } = useContext(UserContext);
  const filterList = list.filter(data => data.id === productId);
  const product = filterList[0];

    // Finding the current user's wishlist
    const user = userList.find(user => user.userEmail === currentUser.email);
    const wishlist = user ? user.wishListItems : [];

  const addWishListItem = useAddWishList();
  const addToWishListHandler = async (id) => {
    await addWishListItem(id);
  };

  const addCartItem = useAddCart();
  const addToCartHandler = async (id) => {
    await addCartItem(id);
  };

  return (
    <div className="product-details">
      {product ? (
        <div className="product-details__container">
          <div className="product-details__images" onClick={() => navigate(`/shop/${product.id}`)}>
            {product.images && product.images.map((image, index) => (
              <img key={index} src={image} alt={`Product image ${index + 1}`} className="product-image"/>
            ))}
          </div>
          <div className="product-details__info">
            <h1 className="product-details__name">{product.name}</h1>
            <h3 className="product-details__brand">{product.brand}</h3>
            <p className="product-details__description">{product.description}</p>
            <div className="product-details__price">
              <span className="price">${product.price}</span>
              <span className="discount">{product.discount}% OFF</span>
              <span className="discounted-price">${(product.price - (product.price * product.discount) / 100).toFixed(2)}</span>
            </div>
            <div className="product-details__specifications">
              <h3>Specifications:</h3>
              <ul>
                {product.specification && product.specification.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
            <div className="product-details__actions">
            <button  className="wishlist-button"  onClick={(e) => { e.stopPropagation(); addToWishListHandler(product.id); }}>
                <FavoriteIcon style={{ color: wishlist.includes(product.id) ? 'red' : '#4287f5' }} />
              </button>
              <button className="cart-button" onClick={() => addToCartHandler(product.id)}>
                <ShoppingCartCheckoutIcon /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
