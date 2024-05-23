import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SearchResultSection.css'; // Assuming you have a CSS file for styling

function SearchResultSection() {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const queryParam = params.get('q');
        if (queryParam) {
            setQuery(queryParam);
            fetchArticles(queryParam);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchArticles = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/articles/search?q=${query}`);
            setArticles(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching articles:', error.message);
            setError('Failed to fetch articles. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <main className="article-main">
            <h1>Search Results for: {query}</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <ul>
                {articles.map(article => (
                    <li key={article.article_id} className="article-item">
                        <Link to={`/articles/${article.article_id}`}>
                            <h2>{article.under_title}</h2>
                            <p>{article.content}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            {!loading && articles.length === 0 && <p>No articles found.</p>}
        </main>
    );
}

export default SearchResultSection;
