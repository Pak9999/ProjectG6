
/* Denna filen inklusive TestNavbar.css är en den nya uppdaterade versionen av navbaren - Gamla ska tas bort.*/

import React, { useState } from 'react';
import './TestNavbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import Button from '../../components/Button/Button';
import homelogo from '../../assets/images/home.png'
import paperplane from '../../assets/images/paper-plane.png'
import questionmark from '../../assets/images/question-sign.png'


function TestNavbar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <nav className="test-navbar">
            <div className="test-logo-container">
                <Link to="/">
                    <img src={logo} className="test-navbar-logo" alt="Logo" />
                </Link>
                <Link to="/">
                    <h1 className="test-navbar-text">Away</h1>                    
                </Link>
                
                
            </div>
            <div className={`menu-icon ${showMobileMenu ? 'active' : ''}`} onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? 'X' : '☰'}
            </div>
            <ul className={showMobileMenu ? 'test-nav-menu active' : 'test-nav-menu'}>
                <li className="test-nav-item">
                    <img src={homelogo} alt="" style={{ width: '30px', padding: '5px 5px 6px 5px', }} />
                    <Link to="/" className='test-nav-links'>Home</Link>
                </li>
                <li className="test-nav-item">
                    <img src={questionmark} alt="" style={{ width: '30px', padding: '5px 5px 6px 5px', }} />
                    <Link to="/About" className='test-nav-links'>About</Link>
                </li>

                
            </ul>

        </nav>
    );
}

export default TestNavbar;

