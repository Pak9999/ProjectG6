
/* Denna filen inklusive TestNavbar.css är en den nya uppdaterade versionen av navbaren - Gamla ska tas bort.*/

/**
 * Renders the TestNavbar component.
 * 
 * @returns {JSX.Element} The rendered TestNavbar component.
 */

import React, { useState } from 'react';
import './TestNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';


function TestNavbar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchQuery}`);
    };


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
                <li className="test-nav-item">
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </li>
            </ul>
        </nav>
    );
}

export default TestNavbar;
