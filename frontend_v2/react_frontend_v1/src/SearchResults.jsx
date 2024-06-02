import React from 'react';
import './App.css';
import TestFooter from './layout/TestFooter/TestFooter.jsx';
import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';
import SearchResultSection from './layout/SearchResultSection/SearchResultSection.jsx';

function SearchResult() {
    return (
        <>
            <TestNavbar></TestNavbar>
            <SearchResultSection></SearchResultSection>
            <TestFooter></TestFooter>
        </>
    );
}

export default SearchResult;