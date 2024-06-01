import React from 'react';

import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';
import Header from './layout/Header/Header.jsx'
import ContinentComponent from './components/ContinentComponent/ContinentComponent.jsx';
import TestFooter from './layout/TestFooter/TestFooter.jsx';

import './App.css';

/**
 * Renders the Home component.
 * 
 * @returns {JSX.Element} The rendered Home component.
 */

function Home() {
  return (
    <>
      <TestNavbar></TestNavbar>
      <Header></Header>
      <ContinentComponent></ContinentComponent>
      <TestFooter></TestFooter>
    </>
  );
}

export default Home;