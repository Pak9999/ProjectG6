import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import exampleImage from '../../assets/images/italyarticleheader.png';
import '../ArticleHeader/ArticleHeader.css';


/**
 * Renders the CityArticleHeader component for CITY.
 * 
 * @returns {JSX.Element} The rendered CityArticleHeader component.
 */

function CityArticleHeader() {
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

        if (cityId) {
            fetchCity();
        }
    }, [cityId]);

    if (!city) {
        return <div>Loading...</div>;
    }

    return (
        <div className="article-header-banner">
            {city.articles && city.articles.map(article => (
                <div key={article.article_id} className="article-header-image"
                    style={{ backgroundImage: `url(${article.images && article.images.length > 0 ? article.images[0].image_url : exampleImage})` }}>
                    <div className="article-header-content" id="home">
                        <div className="article-header-title">
                            <h1>{city.city_name}</h1>
                            <p>{article.under_title}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CityArticleHeader;
