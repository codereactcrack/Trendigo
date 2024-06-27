import React from 'react'
import Carousel from './Carousel'
import Parallex from './Parallex'
import FeaturedProduct from './FeaturedProduct'
import TopBrands from './TopBrands'
import StaticSection from './StaticSection'

const Home = () => {
  return (
    <div className='home-container'>
      <div className='carousel-container'>
        <Carousel />
      </div>
      <div className='featured-product'><FeaturedProduct /></div>
      <StaticSection />
      <div className='top-brands'><TopBrands /></div>
      <div className='category-parallex'><Parallex/></div>
    </div>

  )
}

export default Home