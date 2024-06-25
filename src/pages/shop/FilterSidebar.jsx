import React from 'react';
import './css/FilterSidebar.css';

const FilterSidebar = () => {
  return (
    <div className='filter-sidebar'>
      <div className='filter-heading'>Filter BY</div>
      <div className='filter-section'>
        <div className='filter-subheading'>Price</div>
        {/* Price filter options will go here */}
      </div>
      <div className='filter-section'>
        <div className='filter-subheading'>Brand</div>
        {/* Brand filter options will go here */}
      </div>
    </div>
  );
}

export default FilterSidebar;
