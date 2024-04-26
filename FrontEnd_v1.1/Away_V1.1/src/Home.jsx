import React from 'react';
import Navbar from './layout/Navbar/Navbar.jsx'
import Header from './layout/Header/Header.jsx'
import FeaturedDestinations from './sections/FeaturedDestinations/FeaturedDestinations.jsx';
import Continents from './Continents.jsx';
import Footer from './layout/Footer/Footer.jsx';
import PopCarousel from './PopCarousel.jsx';
import Quiz from './components/Quiz/Quiz.jsx'
import Carousel from "./components/Carousel/Carousel.jsx";
import Card from "./components/Card/Card.jsx";
import Slider from "./components/Slider/Slider.jsx"
import TravelCategory from './sections/TravelCategory/TravelCategory.jsx';
import './App.css';

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Header></Header>
      <FeaturedDestinations></FeaturedDestinations>
      <Slider></Slider>
      <TravelCategory></TravelCategory>
      <Continents></Continents>
      <Footer></Footer>
      <Card></Card>
      <Carousel></Carousel>
      <Quiz></Quiz>
    </>
  );
}

export default Home;