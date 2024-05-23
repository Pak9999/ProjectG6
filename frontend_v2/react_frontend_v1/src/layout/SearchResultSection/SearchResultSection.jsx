import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/search/?q=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a country or article"
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {results.map((country) => (
                    <div key={country.country_id}>
                        <h3>{country.country_name}</h3>
                        <ul>
                            {country.articles.map((article) => (
                                <li key={article.article_id}>
                                    <a href={`/articles/${article.article_id}`}>
                                        {article.under_title}
                                    </a>
                                    <p>{article.content}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
