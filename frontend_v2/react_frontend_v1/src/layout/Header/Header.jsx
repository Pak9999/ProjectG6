import bgvid from '../../assets/images/bgvid.mp4';
import Button from '../../components/Button/Button';
import './Header.css'

function Header() {
    const navigateToDestinations = () => {
        const element = document.getElementById('pop-destinations');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="header-banner">
                <video src={bgvid} type="video/mp4" autoPlay muted loop></video>
                <div className="header-content" id="home">
                    <div className="header-title">
                        <h1>AWAY</h1>
                        <p>Plan your trip with us to find the perfect vacation for you!</p>
                        <Button className="header-button" onClick={navigateToDestinations}>Explore Popular Destinations</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;