import React from 'react';
import Navbar from './layout/Navbar/Navbar.jsx'
import Header from './layout/Header/Header.jsx'
import FeaturedDestinations from './sections/FeaturedDestinations/FeaturedDestinations.jsx';
import Continents from './Continents.jsx';
import Footer from './layout/Footer/Footer.jsx';

import Quiz from './components/Quiz/Quiz.jsx'


import Slider from "./components/Slider/Slider.jsx"
import TravelCategory from './sections/TravelCategory/TravelCategory.jsx';
import './App.css';

import TestFooter from './layout/TestFooter/TestFooter.jsx';

import Carousel from './components/Carousel/Carousel.jsx'

import Card from './components/Card/Card.jsx'
import TestNavbar from './layout/TestNavbar/TestNavbar.jsx';
import Trip from './components/Trip/Trip.jsx';
import ContinentArticlePage from './ContinentArticlePage.jsx';
import ContinentComponent from './components/ContinentComponent/ContinentComponent.jsx';


function Home() {
  return (
    <>
      <TestNavbar></TestNavbar>
      <Header></Header>
      {/*       <Trip></Trip>*/}
      <ContinentComponent></ContinentComponent>
      {/*       <FeaturedDestinations></FeaturedDestinations>*/}
      {/*       <TravelCategory></TravelCategory>*/}

      {/*       <Carousel></Carousel>*/}      
      {/*       <Slider></Slider> */}

      {/*       <Continents></Continents> */}
      {/*       <Card></Card> */}
      <TestFooter></TestFooter>




    </>
  );
}

export default Home;