import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';


import Home from './Home.jsx';
import ArticleTemplate from './ArticleTemplate.jsx';
import NotFound from './NotFound.jsx';
import About from './About.jsx';
import ContinentArticlePage from './ContinentArticlePage.jsx';
import CountryArticlePage from './CountryArticlePage'; // Adjust the path based on your file structure
import RegionArticlePage from './RegionArticlePage';  // Make sure this import is correct
import CityArticlePage from './CityArticlePage';  // Make sure this import is correct
import PointOfInterestArticlePage from './PointOfInterestArticlePage';  // Make sure this import is correct



import ContinentComponent from './components/ContinentComponent/ContinentComponent.jsx';



function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/countries/');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error.message);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article-template" element={<ArticleTemplate />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />

        {/* Pass countries data as props to ContinentComponent */}
        <Route path="/" element={<ContinentComponent countries={countries} />} />
        {/* Add a route for individual continent */}
        <Route path="/continent/:continentId" element={<ContinentArticlePage />} />

        <Route path="/country/:countryId" element={<CountryArticlePage />} />

        <Route path="/region/:regionId" element={<RegionArticlePage />} />

        <Route path="/city/:cityId" element={<CityArticlePage />} />

        <Route path="/poi/:poiId" element={<PointOfInterestArticlePage />} />

      </Routes>
    </Router>
  );
}

export default App;