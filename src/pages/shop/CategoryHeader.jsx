import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/CategoryHeader.css';

const CategoryHeader = () => {
  const categoryList = [
    { name: 'MEN', location: 'category/men' },
    { name: 'WOMEN', location: 'category/women' },
    { name: 'FURNITURE', location: 'category/furniture' },
    { name: 'BEAUTY', location: 'category/beauty' },
    { name: 'ELECTRONICS', location: 'category/electronics' },
    { name: 'OTHERS', location: 'category/others' },
  ];

  return (
    <div className="category-header">
      {categoryList.map((item) => (
        <div key={item.name} className="category-header__item">
          <NavLink to={item.location} activeClassName="active">
            {item.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default CategoryHeader;
