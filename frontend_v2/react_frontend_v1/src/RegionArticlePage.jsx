import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';
import RegionArticleHeader from './layout/RegionArticleHeader/RegionArticleHeader.jsx';
import RegionArticleSection from './layout/RegionArticleSection/RegionArticleSection.jsx';
import TestFooter from './layout/TestFooter/TestFooter.jsx';

import './App.css';

/**
 * Renders the RegionArticlePage component.
 * 
 * @returns {JSX.Element} The rendered RegionArticlePage component.
 */

const RegionArticlePage = () => {
    const [region, setRegion] = useState(null);
    const { regionId } = useParams();

    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/regions/${regionId}`);
                setRegion(response.data);
            } catch (error) {
                console.error('Error fetching region:', error);
            }
        };

        fetchRegion();
    }, [regionId]);

    if (!region) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <TestNavbar />
        <RegionArticleHeader />
        <RegionArticleSection/>
        <TestFooter />
    </>
    );
};

export default RegionArticlePage;
