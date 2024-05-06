import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';

import './App.css';
import TestFooter from './layout/TestFooter/TestFooter.jsx';
import CountryArticleHeader from './layout/CountryArticleHeader/CountryArticleHeader.jsx';
import CountryArticleSection from './layout/CountryArticleSection/CountryArticleSection.jsx';


const CountryArticlePage = () => {
    const [country, setCountry] = useState(null);
    const { countryId } = useParams();

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/countries/${countryId}`);
                setCountry(response.data);
            } catch (error) {
                console.error('Error fetching country:', error);
            }
        };

        if (countryId) {
            fetchCountry();
        }
    }, [countryId]);

    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <TestNavbar />
        <CountryArticleHeader />
        <CountryArticleSection/>
        <TestFooter />
    </>
    );
};

export default CountryArticlePage;