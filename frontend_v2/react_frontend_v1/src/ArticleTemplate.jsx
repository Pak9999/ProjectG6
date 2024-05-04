import React from 'react';
import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';
import ArticleHeader from './layout/ArticleHeader/ArticleHeader.jsx';
import SubHeader from './layout/SubHeader/SubHeader.jsx';

import ArticleSection from './layout/ArticleSection/ArticleSection.jsx';
import ArticleTravelType from './layout/ArticleTravelType/ArticleTravelType.jsx';

import Destination1 from './components/Destination1/Destination1.jsx';
import Destination2 from './components/Destination2/Destination2.jsx';

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


