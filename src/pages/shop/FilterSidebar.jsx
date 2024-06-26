import React from 'react';
import './css/FilterSidebar.css';
import Slider from '@mui/material/Slider';
import { useNavigate } from 'react-router-dom';
import FilterByBrand from './Filter/FilterByBrand';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const FilterSidebar = () => {
    const [value, setValue] = React.useState([0, 100000]);
    const naviagte = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function valuetext(value) {
        return `${value}`;
    }

    return (
        <div className='filter-sidebar'>
            <div className='filter-heading'>
                Filter BY 
                <button onClick={()=>naviagte('/shop')} className='reset-button'><RestartAltIcon/></button>
            </div>
            <div className='filter-section'>
                <div className='filter-subheading'>
                    <span className='filter-name'> Price</span> 
                    <button onClick={()=>naviagte(`/shop/price/${value[0]},${value[1]}`)}>Apply</button>
                </div>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={90000}
                />
                <div className="price-display">
                    ${value[0]} - ${value[1]}
                </div>
            </div>
            <div className='filter-section'>
                <FilterByBrand />
            </div>
        </div>
    );
}

export default FilterSidebar;
