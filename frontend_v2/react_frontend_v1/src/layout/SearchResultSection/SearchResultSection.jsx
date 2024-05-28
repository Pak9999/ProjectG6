import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SearchResultSection.css'; // Assuming you have a CSS file for styling

function SearchResultSection() {
    const [continents, setContinents] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const queryParam = params.get('q');
        if (queryParam) {
            setQuery(queryParam);
            fetchContinents(queryParam);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchContinents = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/continents/search?q=${query}`);
            setContinents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching continents:', error.message);
            setError('Failed to fetch continents. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <main className="continent-main">
            <h1>Search Results for: {query}</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <ul>
                {continents.map((continent, index) => (
                    <li key={index} className="continent-item">
                        <Link to={`/continent/${continent.continent_id}`}>
                            <h2>{continent.continent_name}</h2>
                            <p>Continent ID: {continent.continent_id}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            {!loading && continents.length === 0 && <p>No continents found.</p>}
        </main>
    );
}

export default SearchResultSection;
