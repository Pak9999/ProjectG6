import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import exampleImage from '../../assets/images/italyarticleheader.png';
import './ArticleHeader.css';

function RegionArticleHeader() {
    const [region, setRegion] = useState(null);  // Changed from setCountry to setRegion for clarity
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

        if (regionId) {
            fetchRegion();
        }
    }, [regionId]);

    if (!region) {
        return <div>Loading...</div>;
    }

    return (
        <div className="article-header-banner">
            {region.articles && region.articles.map(article => (
                <div key={article.article_id} className="article-header-image"
                    style={{ backgroundImage: `url(${article.images && article.images.length > 0 ? article.images[0].image_url : exampleImage})` }}>
                    <div className="article-header-content" id="home">
                        <div className="article-header-title">
                            <h1>{region.region_name}</h1>
                            <p>{article.under_title}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RegionArticleHeader;
