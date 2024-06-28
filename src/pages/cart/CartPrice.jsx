import React, { useEffect, useState } from 'react';
import './css/CartPrice.css';

const CartPrice = (props) => {
  const cartList = props.cartValue;
  const [totalMrp, setTotalMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(99);
  const [totalAmount, setTotalAmount] = useState(0);
  const platformFee = 20;

  useEffect(() => {
    let mrp = 0;
    let tAmount = 0;
    for (let i = 0; i < cartList.length; i++) {
      mrp += parseInt(cartList[i].price);
      tAmount += parseInt(cartList[i].finalPrice);
    }
    const calculatedDiscount = mrp - tAmount;
    setTotalMrp(mrp);
    setDiscount(calculatedDiscount);
    setShippingFee(tAmount > 999 ? 0 : 99);
    setTotalAmount(tAmount + (tAmount > 999 ? 0 : 99) + platformFee);
  }, [cartList]);

  return (
    <div className='price-details-container'>
      <h2 className='price-details-heading'>Price Details</h2>
      <div className='price-details-row'>
        <span className='price-details-label'>Cart Value:</span>
        <span className='price-details-value'>({cartList.length} items)</span>
      </div>
      <div className='price-details-row'>
        <span className='price-details-label'>Total MRP:</span>
        <span className='price-details-value'>₹{totalMrp}</span>
      </div>
      <div className='price-details-row'>
        <span className='price-details-label'>Discount on MRP:</span>
        <span className='price-details-value'>₹{discount}</span>
      </div>
      <div className='price-details-row'>
        <span className='price-details-label'>Platform Fee:</span>
        <span className='price-details-value'>₹{platformFee}</span>
      </div>
      <div className='price-details-row'>
        <span className='price-details-label'>Shipping Fee:</span>
        <span className='price-details-value'>₹{shippingFee}</span>
      </div>
      <div className='price-details-row total'>
        <span className='price-details-label'>TOTAL AMOUNT:</span>
        <span className='price-details-value'>₹{totalAmount}</span>
      </div>
      <button className='place-order-button' >PLACE ORDER</button>
    </div>
  );
};

export default CartPrice;
