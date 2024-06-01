import React from 'react';
import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';
import ArticleHeader from './layout/ArticleHeader/ArticleHeader.jsx';

import ArticleSection from './layout/ArticleSection/ArticleSection.jsx';


import './App.css';
import TestFooter from './layout/TestFooter/TestFooter.jsx';



function ArticleTemplate() {
    return (
        <>
            <TestNavbar />
            <ArticleHeader />
            <ArticleSection />
            <TestFooter />
            {/* Rest of your article content */}
        </>
    );
}

export default ArticleTemplate;


