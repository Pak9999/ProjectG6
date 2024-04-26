import React from 'react';
import Button from '../../components/Button/Button';
import exampleImage from '../../assets/images/italyarticleheader.png'; 
import './ArticleHeader.css'

function ArticleHeader() {
    const navigateToArticleSection = () => {
        const element = document.getElementById('home');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="article-header-banner">
            <div className="article-header-image" style={{ backgroundImage: `url(${exampleImage})` }}></div>
            <div className="article-header-content" id="home">
                <div className="article-header-title">
                    <h1>ITALIEN</h1>
                    <p>This is an example article.</p>
                    <Button className="article-header-button" onClick={navigateToArticleSection}>Read More</Button>
                </div>
            </div>
        </div>
    );
}

export default ArticleHeader;