import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import './ContinentComponent.css';

import './App.css';

const ContinentComponent = () => {
  const [continents, setContinents] = useState([]);
  const baseUrl = 'http://localhost:8000'; // This should be the base URL of your Django backend
  const settings = {
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 7,
    
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
      <Slider {...settings}>
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
