import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SubHeader.css'


/**
 * Renders the SubHeader component.
 * 
 * @returns {JSX.Element} The rendered SubHeader component.
 */

function SubHeader() {
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
        <>

            <section className="article-subheader">

                <div className="article-subheader-title">
                    <h2>{continent.continent_name}</h2>
                </div>
                {continent.articles && continent.articles.map(article => (
                        <div key={article.article_id}>
                            <h4 className='article-subheader-text'>{article.under_title}</h4>
                        </div>
                    ))}
                <p className='divider'>_______________________________________________________________________________</p>
            </section>

        </>
    );
}

export default SubHeader;