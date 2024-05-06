import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import exampleImage from '../../assets/images/italyarticleheader.png';
import './ArticleHeader.css'



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
            <div className="article-header-image" style={{ backgroundImage: `url(${exampleImage})` }}></div>
            <div className="article-header-content" id="home">
                <div className="article-header-title">

                    <h1>{city.city_name}</h1>
                    {city.articles && city.articles.map(article => (
                        <div key={article.article_id}>
                            <p>{article.under_title}</p>
                        </div>
                    ))}
{/*                     <Button className="article-header-button" onClick={navigateToArticleSection}>Read More</Button>
 */}                </div>
            </div>
        </div>
    );
}

export default CityArticleHeader;