import bgvid from '../../assets/images/bgvid.mp4';
import arrow from '../../assets/symbols/white-down-arrow-png-2.png';
import './Header.css'

/**
 * Renders the Header component.
 * 
 * @returns {JSX.Element} The rendered Header component.
 */

function Header() {


    return (
        <>
            <div className="header-banner">
                <video src={bgvid} type="video/mp4" autoPlay muted loop></video>
                <div className="header-content" id="home">
                    <div className="header-title">
                        <h1>AWAY</h1>
                        <p>Plan your trip with us to find the perfect vacation for you!</p>



                    </div>
                    <div className='scroll-down-box'>
                        <h5>Scroll down to start exploring destinations</h5>
                        <div className='arrow_down'>
                            <img className='arrow_down' src={arrow} alt="white arrow down" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;