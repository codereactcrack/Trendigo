import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FilterByBrand = () => {

    const brand  = ['H&M','ZARA','Nike','SUGAR','iPhone']
    const naviagte = useNavigate();
  return (
    <div className='filter-brand'>
        <div className='filter-subheading'>
            <span className='filter-name'> Brand</span> 
        </div>
        {brand.map((item)=>{
            return (<div> 
                <input type='radio' value={item} name='brand' 
                    onChange={(e)=>naviagte(`/shop/brand/${e.target.value}`)}/> {item} 
                </div>)
        })}
    </div>
  )
}

export default FilterByBrand