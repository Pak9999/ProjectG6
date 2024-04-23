import logo from '../../assets/images/logo.png';
import './Navbar.css'


function Navbar() {
    return (
        <>
            <div className="navbar-content" id="home">
                <nav>
                    <img src={logo} className="logo" alt="Logo" title="AWAY" />
                    <ul className="navbar">
                        <li>
                            <a href="#home">Home</a>
                            <a href="#destination">Destinations</a>
                            <a href="#priceclass">Price class</a>
                            <a href="../HTML/contact.html">Contact</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Navbar;