import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../ArticleSection/ArticleSection.css';

// This component is used to display the article section of a region

/**
 * Renders the RegionArticleSection component for REGION.
 * 
 * @returns {JSX.Element} The rendered RegionArticleSection component.
 */

function RegionArticleSection() {
    const [region, setRegion] = useState(null);
    const [hierarchy, setHierarchy] = useState([]);
    const { regionId } = useParams();

    useEffect(() => {
        const fetchHierarchy = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/continents/');
                const allData = response.data;
                // Function to find the region and extract hierarchy
                const findRegionAndHierarchy = (data, regionId) => {
                    for (const continent of data) {
                        for (const country of continent.countries) {
                            for (const region of country.regions) {
                                if (region.region_id.toString() === regionId) {
                                    setRegion(region);
                                    return [
                                        { type: 'continent', id: continent.continent_id, name: continent.continent_name },
                                        { type: 'country', id: country.country_id, name: country.country_name }
                                    ];
                                }
                            }
                        }
                    }
                    return [];
                };
                setHierarchy(findRegionAndHierarchy(allData, regionId));
            } catch (error) {
                console.error('Error fetching hierarchy data:', error);
            }
        };

        if (regionId) {
            fetchHierarchy();
        }
    }, [regionId]);

    if (!region) {
        return <div>Loading...</div>;
    }

    return (
        <main className="article-main">
            <section className="article-subheader">
                <div className="article-subheader-title">
                    <h2>{region.region_name}</h2>
                </div>
                {region.articles && region.articles.map(article => (
                    <div key={article.article_id}>
                        <h4 className='article-subheader-text'>{article.under_title}</h4>
                    </div>
                ))}
                <p className='divider'>_______________________________________________________________________________</p>
            </section>

            <section className='article-section'>
                {region.articles && region.articles.map(article => (
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
                <h3>Cities</h3>
                <ul>
                    {region.cities.map((city) => (
                        <li key={city.city_id}>
                            <Link to={`/city/${city.city_id}`}>{city.city_name}</Link>
                        </li>
                    ))}
                </ul>
                <h3>Sights</h3>
                <ul>
                    {region.pois_region.map((poi) => (
                        <li key={poi.poi_id}>
                            <Link to={`/poi/${poi.poi_id}`}>{poi.poi_name}</Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </main>
    );
}

export default RegionArticleSection;
