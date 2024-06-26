import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import './ArticleSection.css'

/**
 * Renders the ArticleSection component for CONTINENT.
 * 
 * @returns {JSX.Element} The rendered ArticleSection component.
*/

function ArticleSection() {
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
        <main className="article-main">
            <section className="article-subheader">
                <div className="article-subheader-title">
                    <h2>{continent.continent_name}</h2>
                </div>
                {continent.articles && continent.articles.map(article => (
                    <div key={article.article_id}>
                        <h4 className='article-subheader-text'>{article.under_title}</h4>
                    </div>
                ))}
                <p className='divider'>_______________________________________________________________________________</p>
            </section>

            <section className='article-section'>
                {continent.articles && continent.articles.map(article => (
                    <div key={article.article_id}>
                        <p className="article-content">{article.content}</p>
                    </div>
                ))}
            </section>

            <aside className='article-aside'>
                <h2>Navigation</h2>
                <a href="/">Back to home page</a>
                <h3>Information</h3>
                <p>Here are some facts...</p>
                <h3>Countries</h3>
                <ul>
                    {continent.countries.map((country) => (
                        <li key={country.country_id}>
                            <Link to={`/country/${country.country_id}`}>{country.country_name}</Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </main>
    );
}

export default ArticleSection;
