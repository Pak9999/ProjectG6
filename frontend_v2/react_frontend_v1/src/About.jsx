import React from 'react';
import TestNavbar from './layout/TestNavbar/TestNavbar';
import TestFooter from './layout/TestFooter/TestFooter';
import AboutContent from './layout/AboutContent/AboutContent';
import './About.css';

/**
 * Renders the About component.
 * 
 * @returns {JSX.Element} The rendered About component.
 */


function About() {
    return (
      <>
        <TestNavbar></TestNavbar>
        <AboutContent></AboutContent>
        <TestFooter></TestFooter>
      </>
    );
  }
  
  export default About;