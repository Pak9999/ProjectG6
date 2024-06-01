import React from 'react';
import './AboutContent.css';

/**
 * Renders the AboutContent component.
 *
 * @returns {JSX.Element} The rendered AboutContent component.
 */

function AboutContent() {
    return (
        <div className='about-container'>
            <h1>About us</h1>
            <p>We are a group of information architecture students from Malmö university.</p>
            <p>This is part of our project work</p>
            <p>Please enjoy!</p>
            <div className='name-list'>
                <p>Andreas Persson, Max Krüger, Nils Norén, Simon Sjöholm, Wilmer Nordblad Lundin</p>
            </div>
        </div>
    );
}

export default AboutContent;