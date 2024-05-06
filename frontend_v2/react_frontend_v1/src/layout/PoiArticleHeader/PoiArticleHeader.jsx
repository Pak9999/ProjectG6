import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import exampleImage from '../../assets/images/italyarticleheader.png';
import './ArticleHeader.css'



function PoiArticleHeader() {
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

        if (poiId) {
            fetchPoi();
        }
    }, [poiId]);

    if (!poi) {
        return <div>Loading...</div>;
    }

    return (
        <div className="article-header-banner">
            <div className="article-header-image" style={{ backgroundImage: `url(${exampleImage})` }}></div>
            <div className="article-header-content" id="home">
                <div className="article-header-title">

                    <h1>{poi.poi_name}</h1>
                    {poi.articles && poi.articles.map(article => (
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

export default PoiArticleHeader;