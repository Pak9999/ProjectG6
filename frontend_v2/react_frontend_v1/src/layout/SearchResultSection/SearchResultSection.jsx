import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchResultSection() {
    const [articles, setArticles] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/search/?q=${query}`);
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        if (query) {
            fetchArticles();
        }
    }, [query]);

    return (
        <main className="article-main">
            <h1>Search Results for "{query}"</h1>
            {articles.length > 0 ? (
                <ul>
                    {articles.map((article) => (
                        <li key={article.article_id}>
                            <h2>{article.under_title}</h2>
                            <p>{article.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No articles found.</p>
            )}
        </main>
    );
}

export default SearchResultSection;
