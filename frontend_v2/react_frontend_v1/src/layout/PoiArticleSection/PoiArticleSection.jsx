import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../ArticleSection/ArticleSection.css';

function PoiArticleSection() {
    const [poi, setPoi] = useState(null);
    const [hierarchy, setHierarchy] = useState([]);
    const { poiId } = useParams();

    useEffect(() => {
        const fetchHierarchy = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/continents/');
                const allData = response.data;
                // Function to extract hierarchy
                const extractHierarchy = (data, poiId) => {
                    for (const continent of data) {
                        for (const country of continent.countries) {
                            for (const region of country.regions) {
                                for (const city of region.cities) {
                                    for (const poi of city.pois_city) {
                                        if (poi.poi_id.toString() === poiId) {
                                            return [
                                                { type: 'continent', id: continent.continent_id, name: continent.continent_name },
                                                { type: 'country', id: country.country_id, name: country.country_name },
                                                { type: 'region', id: region.region_id, name: region.region_name },
                                                { type: 'city', id: city.city_id, name: city.city_name },
                                            ];
                                        }
                                    }
                                }
                                for (const poi of region.pois_region) {
                                    if (poi.poi_id.toString() === poiId) {
                                        return [
                                            { type: 'continent', id: continent.continent_id, name: continent.continent_name },
                                            { type: 'country', id: country.country_id, name: country.country_name },
                                            { type: 'region', id: region.region_id, name: region.region_name },
                                        ];
                                    }
                                }
                            }
                        }
                    }
                    return [];
                };
                setHierarchy(extractHierarchy(allData, poiId));
                // Set the POI
                const findPoi = (data, poiId) => {
                    for (const continent of data) {
                        for (const country of continent.countries) {
                            for (const region of country.regions) {
                                for (const city of region.cities) {
                                    for (const poi of city.pois_city) {
                                        if (poi.poi_id.toString() === poiId) {
                                            return poi;
                                        }
                                    }
                                }
                                for (const poi of region.pois_region) {
                                    if (poi.poi_id.toString() === poiId) {
                                        return poi;
                                    }
                                }
                            }
                        }
                    }
                    return null;
                };
                setPoi(findPoi(allData, poiId));
            } catch (error) {
                console.error('Error fetching hierarchy data:', error);
            }
        };

        if (poiId) {
            fetchHierarchy();
        }
    }, [poiId]);

    if (!poi) {
        return <div>Loading...</div>;
    }

    return (
        <main className="article-main">
            <section className="article-subheader">
                <div className="article-subheader-title">
                    <h2>{poi.poi_name}</h2>
                </div>
                {poi.articles && poi.articles.map(article => (
                    <div key={article.article_id}>
                        <h4 className='article-subheader-text'>{article.under_title}</h4>
                    </div>
                ))}
                <p className='divider'>_______________________________________________________________________________</p>
            </section>

            <section className='article-section'>
                {poi.articles && poi.articles.map(article => (
                    <div key={article.article_id}>
                        <p className="article-content">{article.content}</p>
                    </div>
                ))}
            </section>

            <aside className='article-aside'>
                <h2>Navigation</h2>
                {hierarchy.map(level => (
                    <p key={level.id}>
                        {/* Display the type as plain text and the name as a link */}
                        {`${level.type.charAt(0).toUpperCase() + level.type.slice(1)}: `}
                        <Link to={`/${level.type}/${level.id}`}>
                            {level.name}
                        </Link>
                    </p>
                ))}
                <h3>Information</h3>
                <p>Here are some facts...</p>
            </aside>
        </main>
    );
}

export default PoiArticleSection;
