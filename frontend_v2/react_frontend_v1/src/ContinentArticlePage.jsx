import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';
import ArticleHeader from './layout/ArticleHeader/ArticleHeader.jsx';
import ArticleSection from './layout/ArticleSection/ArticleSection.jsx';
import TestFooter from './layout/TestFooter/TestFooter.jsx';


import './App.css';

/**
 * Renders the ContinentArticlePage component.
 * 
 * @returns {JSX.Element} The rendered ContinentArticlePage component.
 */

const ContinentArticlePage = () => {
  const [continent, setContinent] = useState(null);
  const { continentId } = useParams();  // Match the param name used in your route

  useEffect(() => {
    const fetchContinent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/continents/${continentId}`);
        setContinent(response.data);
      } catch (error) {
        console.error('Error fetching continent:', error);
      }
    };

    if (continentId) {
      fetchContinent();
    }
  }, [continentId]);

  if (!continent) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TestNavbar />
      <ArticleHeader />
      <ArticleSection />
      <TestFooter />

    </>
  );
};

export default ContinentArticlePage;
