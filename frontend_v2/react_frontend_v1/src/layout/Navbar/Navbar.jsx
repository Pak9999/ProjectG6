
/* Utdaterad Navbar. Se nya korrekta TestNavbar.jsx och .css */



import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Navbar.css'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const navbarRef = useRef(null);

    useEffect(() => {
        function adjustMenuPosition() {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }

        adjustMenuPosition(); // Call the function once to set the initial height

        window.addEventListener('resize', adjustMenuPosition);

        // Cleanup function to remove the event listener when the component unmounts
        return () => window.removeEventListener('resize', adjustMenuPosition);
    }, []);

    return (
        <nav className="navbar-content" id="home" ref={navbarRef}>
            <Link to="/" className='logo-container'>
                <img src={logo} className="logo" alt="Logo" title="AWAY" />
                <p className='logo-text'>Away</p>
            </Link>

            <div onClick={() => setIsOpen(!isOpen)} className="hamburger-menu">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <ul className={`navbar-links ${isOpen ? 'open' : ''}`} style={{top: isOpen ? `${navbarHeight}px` : undefined}}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/article-template">Destinations</Link></li>
                <li><Link to="/About">About</Link></li>
                <li><Link to="/About">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;