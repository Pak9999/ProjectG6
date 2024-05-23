
/* Denna filen inklusive TestNavbar.css är en den nya uppdaterade versionen av navbaren - Gamla ska tas bort.*/

import React, { useState } from 'react';
import './TestNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

import homelogo from '../../assets/images/home.png'
import paperplane from '../../assets/images/paper-plane.png'
import questionmark from '../../assets/images/question-sign.png'


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
                <h1 className="test-navbar-text">Away</h1>
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
                    <img src={paperplane} alt="" style={{ width: '30px', padding: '5px 5px 6px 5px', }} />
                    <Link to="/article-template" className='test-nav-links'>Destinations</Link>
                </li>
                <li className="test-nav-item">
                    <img src={questionmark} alt="" style={{ width: '30px', padding: '5px 5px 6px 5px', }} />
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

