import React from 'react';

import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';
import ArticleHeader from './layout/ArticleHeader/ArticleHeader.jsx';
import ArticleSection from './layout/ArticleSection/ArticleSection.jsx';
import TestFooter from './layout/TestFooter/TestFooter.jsx';

import './App.css';

/**
 * Renders the ArticleTemplate component.
 * 
 * @returns {JSX.Element} The rendered ArticleTemplate component.
 */


function ArticleTemplate() {
    return (
        <>
            <TestNavbar />
            <ArticleHeader />
            <ArticleSection />
            <TestFooter />
        </>
    );
}

export default ArticleTemplate;


