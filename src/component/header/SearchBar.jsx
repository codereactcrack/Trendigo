import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import useFetchCollection from '../../hooks/useFetchCollection';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import SearchContext from '../../context/Search/SearchContext';

const SearchBar = () => {
    const {input,setInput} = useContext(SearchContext);
    const productList = useFetchCollection('product-list');
    let filterList;
    if(input){
      filterList = productList.filter(data => (data.name).toLowerCase().includes(input.toLowerCase()));
    }

    const navigate = useNavigate();
  return (
    <div>
        <SearchIcon className="header__search-icon" />
        <input type="text" placeholder="Search Item.." className="header__search-input"  
        onChange={(e)=>setInput(e.target.value) }/>

        <div className='search-list'>
          {input && filterList.map((data)=>{
            return (
              <div>
                <div onClick={()=>navigate(`shop/${data.id}`)}>
                  <SearchIcon />
                  {data.name} 
                </div>
                <div onClick={()=>setInput()}>
                  <CloseRoundedIcon/>
                </div>
              </div>
            )
          })}
        </div>

    </div>
  )
}

export default SearchBar