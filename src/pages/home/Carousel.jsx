import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from '../../services/firebase';
import './css/Carousel.css';
import { useNavigate } from "react-router-dom";

function Carousel() {

  const navigate = useNavigate();
  const handleNavigate = useCallback(() => navigate('/shop'), [navigate]);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '20px',
  };

  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const imagesListRef = ref(storage, 'gs://trendigo-25d4a.appspot.com/Carousel');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await listAll(imagesListRef);
        const urls = await Promise.all(response.items.map(item => getDownloadURL(item)));
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching images: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="slider-container">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Slider {...settings}>
          {imageUrls.map((url, index) => (
            <div key={index} className="image-container" onClick={handleNavigate}>
              <img src={url} alt={`carousel-${index}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Carousel;
