import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../ArticleSection/ArticleSection.css';

function CityArticleSection() {
    const [city, setCity] = useState(null);
    const [hierarchy, setHierarchy] = useState([]);
    const { cityId } = useParams();

    useEffect(() => {
        const fetchHierarchy = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/continents/');
                const allData = response.data;
                // Function to find the city and extract hierarchy
                const findCityAndHierarchy = (data, cityId) => {
                    for (const continent of data) {
                        for (const country of continent.countries) {
                            for (const region of country.regions) {
                                for (const city of region.cities) {
                                    if (city.city_id.toString() === cityId) {
                                        setCity(city);
                                        return [
                                            { type: 'continent', id: continent.continent_id, name: continent.continent_name },
                                            { type: 'country', id: country.country_id, name: country.country_name },
                                            { type: 'region', id: region.region_id, name: region.region_name }
                                        ];
                                    }
                                }
                            }
                        }
                    }
                    return [];
                };
                setHierarchy(findCityAndHierarchy(allData, cityId));
            } catch (error) {
                console.error('Error fetching hierarchy data:', error);
            }
        };

        if (cityId) {
            fetchHierarchy();
        }
    }, [cityId]);

    if (!city) {
        return <div>Loading...</div>;
    }

    return (
        <main className="article-main" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <section className="article-subheader">
                <div className="article-subheader-title">
                    <h2>{city.city_name}</h2>
                </div>
                {city.articles && city.articles.map(article => (
                    <div key={article.article_id}>
                        <h4 className='article-subheader-text'>{article.under_title}</h4>
                    </div>
                ))}
                <p className='divider'>_______________________________________________________________________________</p>
            </section>

            <section className='article-section'>
                {city.articles && city.articles.map(article => (
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
                <h2>Information</h2>
                <p>Här är info</p>
                <h2>Places</h2>
                <ul>
                    {city.pois_city.map((poi) => (
                        <li key={poi.poi_id}>
                            <Link to={`/poi/${poi.poi_id}`}>{poi.poi_name}</Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </main>
    );
}

export default CityArticleSection;
