import React from 'react';

import Header from './layout/Header/Header.jsx'


import './App.css';

import TestFooter from './layout/TestFooter/TestFooter.jsx';


import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';

import ContinentComponent from './components/ContinentComponent/ContinentComponent.jsx';


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