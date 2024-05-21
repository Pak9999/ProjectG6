import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './ContinentComponent.css';

const ContinentComponent = () => {
  const [continents, setContinents] = useState([]);
  const baseUrl = 'http://localhost:8000'; // This should be the base URL of your Django backend
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true, // Centers slides and allows partial prev/next slides to be visible
    centerPadding: '200px', // Adds padding on the sides of the slider
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          centerPadding: '40px', // Adjust padding for smaller screens
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          centerPadding: '20px', // Adjust padding for mobile screens
        }
      }
    ]
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/continents/`);
        setContinents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="destination" id="destination">
      <div className="priceclass-title">
        <h2>Continents</h2>
      </div>
        <Slider className='slider-cont' {...settings}>
          {continents.map(continent => (
            <div key={continent.continent_id}>
              <Link to={`/continent/${continent.continent_id}`}>
                <div className="col-content">
                  <img src={continent.image_url ? `${baseUrl}${continent.image_url}` : 'path_to_default_image.jpg'} alt={continent.continent_name} />
                  <h5>{continent.continent_name}</h5>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
    </section>
  );
};

export default ContinentComponent;
