import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import exampleImage from '../../assets/images/italyarticleheader.png';
import './ArticleHeader.css';

/**
 * Renders the ArticleHeader component for CONTINENT.
 *
 * @returns {JSX.Element} The rendered ArticleHeader component.
 */

function ArticleHeader() {

    const [continent, setContinent] = useState(null);
    const { continentId } = useParams();

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
        <div className="article-header-banner">
            {continent.articles && continent.articles.map(article => (
                <div key={article.article_id} className="article-header-image"
                    style={{ backgroundImage: `url(${article.images && article.images.length > 0 ? article.images[0].image_url : exampleImage})` }}>
                    <div className="article-header-content" id="home">
                        <div className="article-header-title">
                            <h1>{continent.continent_name}</h1>
                            <p>{article.under_title}</p>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ArticleHeader;
