import React from 'react';
import Navbar from './layout/Navbar/Navbar.jsx';
import ArticleHeader from './layout/ArticleHeader/ArticleHeader.jsx';
import SubHeader from './layout/SubHeader/SubHeader.jsx';
import Footer from './layout/Footer/Footer.jsx'
import ArticleSection from './layout/ArticleSection/ArticleSection.jsx';
import ArticleTravelType from './layout/ArticleTravelType/ArticleTravelType.jsx';

import Destination1 from './components/Destination1/Destination1.jsx';
import Destination2 from './components/Destination2/Destination2.jsx';

function ArticleTemplate() {
    return (
        <>
            <Navbar />
            <ArticleHeader />
            <SubHeader />
            <ArticleSection />
            <ArticleTravelType />
            <Destination1 />
            <Destination2 />

            <Footer />
            {/* Rest of your article content */}
        </>
    );
}

export default ArticleTemplate;