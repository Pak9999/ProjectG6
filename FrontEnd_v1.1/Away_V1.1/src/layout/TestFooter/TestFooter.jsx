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
        <section className='footer-subscription'>
          <p className='footer-subscription-heading'>
           Prenumerera på Simons youtube-kanal
          </p>
          <p className='footer-subscription-text'>
            You can INTE unsubscribe at any time.
          </p>
          <div className='input-areas'>
            <form>
              <input
                className='footer-input'
                name='email'
                type='email'
                placeholder='Din Mejladress..'
              />
              <Button buttonStyle='btn--outline'>SUBSCRIBE! PEWDIEPIE</Button>
            </form>
          </div>
        </section>
        <div className='footer-links'>
          <div className='footer-link-wrapper'>
            <div className='footer-link-items'>
              <h2>Om Oss</h2>
              <Link to='/sign-up'>Who we be??</Link>
              <Link to='/'>Test</Link>
              <Link to='/'>Stuff</Link>
              <Link to='/'>Simon</Link>
            </div>
            <div className='footer-link-items'>
              <h2>Kontakta Oss</h2>
              <Link to='/'>Kontakt</Link>
              <Link to='/'>Frågor?</Link>
              <Link to='/'>Destinations</Link>
              <Link to='/'>Simon igen</Link>
            </div>
          </div>
          <div className='footer-link-wrapper'>
            <div className='footer-link-items'>
              <h2>Videos</h2>
              <Link to='/'>Submit Video</Link>
              <Link to='/'>Simons tape</Link>
              <Link to='/'>Källa</Link>
              <Link to='/'>hmm</Link>
            </div>
            <div className='footer-link-items'>
              <h2>Social Media</h2>
              <Link to='/'>Instagram</Link>
              <Link to='/'>Facebook</Link>
              <Link to='/'>Youtube</Link>
              <Link to='/'>Twitter</Link>
            </div>
          </div>
        </div>
        <section className='social-media'>
          <div className='social-media-wrap'>
            <div className='footer-logo'>
              <Link to='/' className='social-logo'>
                AWAY
                <i className='faa-solid fa-plane' />
              </Link>
            </div>
            <small className='website-rights'>AWAY © 2024</small>
            <div className='social-icons'>
              <Link
                className='social-icon-link facebook'
                to='/'
                target='_blank'
                aria-label='Facebook'
              >
                <img src={facebook} alt="Facebook" />
              </Link>
              <Link
                className='social-icon-link instagram'
                to='/'
                target='_blank'
                aria-label='Instagram'
              >
                <img src={instagram} alt="Instagram" />
              </Link>
              <Link
                className='social-icon-link youtube'
                to='/'
                target='_blank'
                aria-label='Youtube'
              >
                <img src={youtube} alt="YouTube" />
              </Link>
              <Link
                className='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='Twitter'
              >
                <img src={twitter} alt="Twitter" />
              </Link>
              <Link
                className='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='LinkedIn'
              >
                <img src={github} alt="Github" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default TestFooter;