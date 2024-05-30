import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SearchResultSection.css'; // Assuming you have a CSS file for styling

function SearchResultSection() {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const queryParam = params.get('q');
        if (queryParam) {
            setQuery(queryParam);
            fetchSearchResults(queryParam);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/continents/search?q=${query}`);
            setSearchResults(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error.message);
            setError('Failed to fetch search results. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <main className="search-result-main">
            <h1>Search Results for: {query}</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {searchResults.map((result) => (
                <div key={result.continent_id} className="search-result-item">
                    <Link to={`/continent/${result.continent_id}`}> {/* Updated link */}
                        <h2>{result.continent_name}</h2>
                        <p>Continent ID: {result.continent_id}</p>
                    </Link>
                    <ul>
                        {result.countries.map((country) => (
                            <li key={country.country_id}>
                                <Link to={`/country/${country.country_id}`}>
                                    <h3>{country.country_name}</h3>
                                    <p>Country ID: {country.country_id}</p>
                                </Link>
                                <ul>
                                    {country.regions.map((region) => (
                                        <li key={region.region_id}>
                                            <Link to={`/region/${region.region_id}`}>
                                                <h4>{region.region_name}</h4>
                                                <p>Region ID: {region.region_id}</p>
                                            </Link>
                                            
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            {!loading && searchResults.length === 0 && <p>No results found.</p>}
        </main>
    );
}

export default SearchResultSection;