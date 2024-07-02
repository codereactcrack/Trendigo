import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SellerDashBoard.css';

const SellerDashBoard = () => {
    const navigate = useNavigate();
    return (
        <div className='seller-dashboard-container'>
            <div className='listing-section'>
                <div className='listing-text'>For listing of products:</div>
                <button className='listing-button' onClick={() => navigate('/product-listing')}>CLICK HERE</button>
            </div>  
            <div className='listed-products-section'>
                <div className='listed-products-heading'>Your Listed Products:</div>
                <div className='listed-products-list'></div>
            </div>
        </div>
    );
}

export default SellerDashBoard;
