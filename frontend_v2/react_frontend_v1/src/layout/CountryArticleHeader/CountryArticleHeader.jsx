import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ArticleHeader.css';  // Ensure you have the CSS file for styles
import exampleImage from '../../assets/images/italyarticleheader.png';  // Import the default image

function CountryArticleHeader() {
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const { countryId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/countries/${countryId}`)
            .then(response => {
                setCountry(response.data);
            })
            .catch(error => {
                console.error('Error fetching country:', error);
                setError('Failed to fetch country data.');
            });
    }, [countryId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <div className="article-header-banner">
            {country.articles && country.articles.map(article => (
                <div key={article.article_id} className="article-header-image"
                    style={{ backgroundImage: `url(${article.images && article.images.length > 0 ? article.images[0].image_url : exampleImage})` }}>
                    <div className="article-header-content" id="home">
                        <div className="article-header-title">
                            <h1>{country.country_name}</h1>
                            <p>{article.under_title}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CountryArticleHeader;
