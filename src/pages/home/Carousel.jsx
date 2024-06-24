import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from '../../services/firebase';
import './css/Carousel.css';
import { useNavigate } from "react-router-dom";

function Carousel() {

  const navigate = useNavigate();
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '20px', // Adjust the padding to provide a better gap
  };

  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, 'gs://trendigo-25d4a.appspot.com/Carousel');

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {imageUrls.map((url, index) => (
          <div key={index} className="image-container">
            <img src={url} alt={`carousel-${index}`} className="carousel-image" />
            <button className="shop-button" onClick={() => navigate('/shop')}>Shop Now</button>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
