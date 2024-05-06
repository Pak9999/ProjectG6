import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';

import './App.css';
import TestFooter from './layout/TestFooter/TestFooter.jsx';
import CityArticleHeader from './layout/CityArticleHeader/CityArticleHeader.jsx';
import CityArticleSection from './layout/CityArticleSection/CityArticleSection.jsx';

const CityArticlePage = () => {
    const [city, setCity] = useState(null);
    const { cityId } = useParams();

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/cities/${cityId}`);
                setCity(response.data);
            } catch (error) {
                console.error('Error fetching city:', error);
            }
        };

        fetchCity();
    }, [cityId]);

    if (!city) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <TestNavbar />
        <CityArticleHeader />
        <CityArticleSection/>
        <TestFooter />
    </>
    );
};

export default CityArticlePage;
