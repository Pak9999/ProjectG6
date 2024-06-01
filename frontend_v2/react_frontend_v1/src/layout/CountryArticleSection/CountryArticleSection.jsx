import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../ArticleSection/ArticleSection.css';

/**
 * Renders the CountryArticleSection component for COUNTRY.
 * 
 * @returns {JSX.Element} The rendered CountryArticleSection component.
 */

function CountryArticleSection() {
    const [country, setCountry] = useState(null);
    const [hierarchy, setHierarchy] = useState([]);
    const { countryId } = useParams();

    useEffect(() => {
        const fetchHierarchy = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/continents/');
                const allData = response.data;
                // Function to find the country and extract hierarchy
                const findCountryAndHierarchy = (data, countryId) => {
                    for (const continent of data) {
                        for (const country of continent.countries) {
                            if (country.country_id.toString() === countryId) {
                                setCountry(country);
                                return [
                                    { type: 'continent', id: continent.continent_id, name: continent.continent_name }
                                ];
                            }
                        }
                    }
                    return [];
                };
                setHierarchy(findCountryAndHierarchy(allData, countryId));
            } catch (error) {
                console.error('Error fetching hierarchy data:', error);
            }
        };

        if (countryId) {
            fetchHierarchy();
        }
    }, [countryId]);

    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <main className="article-main">
            <section className="article-subheader">
                <div className="article-subheader-title">
                    <h2>{country.country_name}</h2>
                </div>
                {country.articles && country.articles.map(article => (
                    <div key={article.article_id}>
                        <h4 className='article-subheader-text'>{article.under_title}</h4>
                    </div>
                ))}
                <p className='divider'>_______________________________________________________________________________</p>
            </section>

            <section className='article-section'>
                {country.articles && country.articles.map(article => (
                    <div key={article.article_id}>
                        <p className="article-content">{article.content}</p>
                    </div>
                ))}
            </section>

            <aside className='article-aside'>
                <h2>Navigation</h2>
                {hierarchy.map(level => (
                    <p key={level.id}>
                        {`${level.type.charAt(0).toUpperCase() + level.type.slice(1)}: `}
                        <Link to={`/${level.type}/${level.id}`}>{level.name}</Link>
                    </p>
                ))}
                <h3>Information</h3>
                <p>Here are some facts...</p>
                <h3>Regions</h3>
                <ul>
                    {country.regions.map((region) => (
                        <li key={region.region_id}>
                            <Link to={`/region/${region.region_id}`}>{region.region_name}</Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </main>
    );
}

export default CountryArticleSection;
