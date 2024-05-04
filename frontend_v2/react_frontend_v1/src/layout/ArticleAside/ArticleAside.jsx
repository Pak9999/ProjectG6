import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


import './ArticleAside.css'

function ArticleAside() {
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
        <aside className='article-aside'>
            {continent.articles && continent.articles.map(article => (
                    <div key={article.article_id}>
                </div>
                ))}
            {/* Facts and stuff */}
            <h2>Information</h2>
            <p>Here are some facts...</p>

            <h2>Countries</h2>
            <ul>
                {continent.countries.map((country) => (
                    <li key={country.country_id}>
                        <Link to={`/country/${country.country_id}`}>{country.country_name}</Link>                  
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default ArticleAside;