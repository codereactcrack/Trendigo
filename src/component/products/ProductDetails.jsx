import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './css/ProductDetails.css';
import useFetchCollection from '../../hooks/useFetchCollection';
import useAddWishList from '../../hooks/useAddWishList';

const ProductDetails = () => {
  const { productId } = useParams();
  const naviagte = useNavigate();
  const list = useFetchCollection('product-list');
  const filterList  = list.filter(data => data.id === productId)
  const product = filterList[0]

  const addWishListItem = useAddWishList();
  const addtoWishListHandler = async (id) => {
    await addWishListItem(id);}

  return (
    <div className="product-details">
      {product ? (
        <div className="product-details__container" >
          <div className="product-details__images" onClick={()=>naviagte(`/shop/${product.id}`)}>
            {product.images && product.images.map((image, index) => (
              <img key={index} src={image} alt={`Product image ${index + 1}`} />
            ))}
          </div>
          <div className="product-details__info">
            <h1 className="product-details__name">{product.name}</h1>
            <h3 className="product-details__brand">{product.brand}</h3>
            <p className="product-details__description">{product.description}</p>
            <div className="product-details__price">
              <span>Price: ${product.price}</span>
              <span>Discount: {product.discount}%</span>
              <span>Discounted Price: ${product.price - (product.price * product.discount) / 100}</span>
            </div>
            <div className="product-details__specifications">
              <h3>Specifications:</h3>
              <ul>
                {product.specifications && product.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
            <div className="product-details__actions">
              <button className="wishlist-button" onClick={()=>addtoWishListHandler(product.id)}><FavoriteIcon /></button>
              <button className="cart-button">ADD TO CART <ShoppingCartCheckoutIcon /></button>
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
