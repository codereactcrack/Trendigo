import React from 'react';
import { Outlet } from 'react-router-dom';
import './css/Shop.css';
import CategoryHeader from './CategoryHeader';
import FilterSidebar from './FilterSidebar';

const Shop = () => {
  return (
    <div className='shop-container'>
      <CategoryHeader />
      <div className='shop-main-container'>
        <FilterSidebar />
        <div className='outlet-container'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Shop;
