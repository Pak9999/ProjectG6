import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import exampleImage from '../../assets/images/italyarticleheader.png';
import './ArticleHeader.css'


// This component is used to display the header of the article page

function ArticleHeader() {
    const navigateToArticleSection = () => {
        const element = document.getElementById('home');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const [continent, setContinent] = useState(null);
    const { continentId } = useParams();  // Match the param name used in your route

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
            <div className="article-header-image" style={{ backgroundImage: `url(${exampleImage})` }}></div>
            <div className="article-header-content" id="home">
                <div className="article-header-title">

                    <h1>{continent.continent_name}</h1>
                    {continent.articles && continent.articles.map(article => (
                        <div key={article.article_id}>
                            <p>{article.under_title}</p>
                        </div>
                    ))}
                    <Button className="article-header-button" onClick={navigateToArticleSection}>Read More</Button>
                </div>
            </div>
        </div>
    );
}

export default ArticleHeader;