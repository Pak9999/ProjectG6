import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import africa from '../../assets/images/africa.jpg'; // Add this line

import './App.css'


const ContinentComponent = ({ countries }) => {
  const [continents, setContinents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const continentResponse = await axios.get('http://localhost:8000/api/continents/');
        setContinents(continentResponse.data);

        const regionResponse = await axios.get('http://localhost:8000/api/regions/');
        setRegions(regionResponse.data);

        const cityResponse = await axios.get('http://localhost:8000/api/cities/');
        setCities(cityResponse.data);

        const poiResponse = await axios.get('http://localhost:8000/api/PointsOfInterest/');
        setPointsOfInterest(poiResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [activeContinent, setActiveContinent] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [activeCity, setActiveCity] = useState(null);

  const toggleCountryList = continentId => {
    setActiveContinent(activeContinent === continentId ? null : continentId);
    setActiveCountry(null);
    setActiveRegion(null);
    setActiveCity(null);
  };

  const toggleRegionList = countryId => {
    setActiveCountry(activeCountry === countryId ? null : countryId);
    setActiveRegion(null);
    setActiveCity(null);
  };

  const toggleCityList = regionId => {
    setActiveRegion(activeRegion === regionId ? null : regionId);
    setActiveCity(null);
  };

  const togglePoiList = cityId => {
    setActiveCity(activeCity === cityId ? null : cityId);
  };

  return (
    <section className="destination" id="destination">
      <div className="priceclass-title">
        <h2>Continents</h2>
      </div>

      <div className="continent-content">

        {continents.map(continent => (
          <div key={continent.continent_id}>
              <div onMouseEnter={() => toggleCountryList(continent.continent_id)}>
                  <Link to={`/continent/${continent.continent_id}`}>
                    <div className="col-content">

                      <img src={africa} alt="Africa"/>
                      <h5>{continent.continent_name}</h5>

                    </div>
                  </Link>
              </div>
            </div>

        ))}

      </div>
    </section>
  );
};

export default ContinentComponent;
