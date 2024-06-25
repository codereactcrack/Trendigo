import React  from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import useFetchCollection from '../../hooks/useFetchCollection';
import useAddWishList from '../../hooks/useAddWishList';

const Products = () => {
  const {filterType,filterValue} = useParams();
  const list = useFetchCollection('product-list');
  const naviagte = useNavigate();
  const filterList  = list.filter(data => data.category === filterValue) 
  
  const addWishListItem = useAddWishList();
  const addtoWishListHandler = async (id) => {
    await addWishListItem(id);}

  return (
    <div className="product-list">
    {filterList.map((data) => (
      <div key={data.id} className="product-card" >
        <div className="product-image" onClick={()=>naviagte(`/shop/${data.id}`)}>
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
            <button className="wishlist-button" onClick={()=>addtoWishListHandler(data.id)}><FavoriteIcon /></button>
            <button className="cart-button">ADD TO CART <ShoppingCartCheckoutIcon /></button>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Products