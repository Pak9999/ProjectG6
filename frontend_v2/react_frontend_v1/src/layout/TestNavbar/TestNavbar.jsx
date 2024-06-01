
/* Denna filen inklusive TestNavbar.css är en den nya uppdaterade versionen av navbaren - Gamla ska tas bort.*/

/**
 * Renders the TestNavbar component.
 * 
 * @returns {JSX.Element} The rendered TestNavbar component.
 */

import React, { useState } from 'react';
import './TestNavbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';


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
                    <Link to="/" className='test-nav-links'>Home</Link>
                </li>
                <li className="test-nav-item">
                    <Link to="/About" className='test-nav-links'>About</Link>
                </li>

                
            </ul>

        </nav>
    );
}

export default TestNavbar;

