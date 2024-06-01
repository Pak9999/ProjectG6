import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';
import PoiArticleHeader from './layout/PoiArticleHeader/PoiArticleHeader.jsx';
import PoiArticleSection from './layout/PoiArticleSection/PoiArticleSection.jsx';
import TestFooter from './layout/TestFooter/TestFooter.jsx';

import './App.css';


/**
 * Renders the PointOfInterestArticlePage component.
 * 
 * @returns {JSX.Element} The rendered PointOfInterestArticlePage component.
 */

const PointOfInterestArticlePage = () => {
    const [poi, setPoi] = useState(null);
    const { poiId } = useParams();

    useEffect(() => {
        const fetchPoi = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/PointsOfInterest/${poiId}`);
                setPoi(response.data);
            } catch (error) {
                console.error('Error fetching point of interest:', error);
            }
        };

        fetchPoi();
    }, [poiId]);

    if (!poi) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <TestNavbar />
        <PoiArticleHeader />
        <PoiArticleSection/>
        <TestFooter />
    </>
    );
};

export default PointOfInterestArticlePage;
