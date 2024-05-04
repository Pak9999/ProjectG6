

/* Utdaterad Footer. Se nya korrekta TestFooter.jsx och .css */





import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footlinks">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="./contact.html">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footlinks">
                    <h4>Find us on:</h4>
                    <div className="social">
                        <a href="" target="_blank" rel="noopener noreferrer"><i className='bx bxl-facebook'></i></a>
                        <a href="" target="_blank" rel="noopener noreferrer"><i className='bx bxl-instagram'></i></a>
                        <a href="" target="_blank" rel="noopener noreferrer"><i className='bx bxl-twitter'></i></a>
                        <a href="" target="_blank" rel="noopener noreferrer"><i className='bx bxl-youtube'></i></a>
                    </div>
                </div>
            </div>

            <div className="end">
                <p>Copyright &copy; 2024 Away Travel</p>
            </div>
        </footer>
    );
}

export default Footer;