/* Denna filen inklusive TestFooter.css är en den nya uppdaterade versionen av navbaren - Gamla ska tas bort.*/


import React from 'react';
import './TestFooter.css';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import youtube from '../../assets/images/youtube.png';
import twitter from '../../assets/images/twitter.png';
import github from '../../assets/images/github.png';

function TestFooter() {
  return (
    <div className='footer-container'>
      
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <h5 className='social-logo'>
              AWAY
            </h5>
          </div>
          <small className='website-rights'>AWAY © 2024</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link-twitter'
              to='https://github.com/Pak9999/ProjectG6'
              target='_blank'
              aria-label='LinkedIn'
            >
              <img className='git-icon' src={github} alt="Github" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TestFooter;