import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Import all necessary components
import Home from './Home.jsx';
import ArticleTemplate from './ArticleTemplate.jsx';
import NotFound from './NotFound.jsx';
import About from './About.jsx';
import ContinentArticlePage from './ContinentArticlePage.jsx';
import CountryArticlePage from './CountryArticlePage'; 
import RegionArticlePage from './RegionArticlePage';  
import CityArticlePage from './CityArticlePage';  
import PointOfInterestArticlePage from './PointOfInterestArticlePage';  
import SearchResultSection from './layout/SearchResultSection/SearchResultSection';

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
        <Route path="/search" element={<SearchResultSection />} /> 
        <Route path="/continent/:continentId" element={<ContinentArticlePage />} />
        <Route path="/country/:countryId" element={<CountryArticlePage />} />
        <Route path="/region/:regionId" element={<RegionArticlePage />} />
        <Route path="/city/:cityId" element={<CityArticlePage />} />
        <Route path="/poi/:poiId" element={<PointOfInterestArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
