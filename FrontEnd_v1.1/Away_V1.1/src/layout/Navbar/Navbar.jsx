import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import './Navbar.css'



function Navbar() {
    return (
        <div className="navbar-content" id="home">
            <nav>
                <Link to="/">
                    <img src={logo} className="logo" alt="Logo" title="AWAY" />
                </Link>
                <ul className="navbar">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/destination">Destinations</Link></li>
                    <li><Link to="/priceclass">Price class</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;