import './TravelCategory.css'

import ski from '../../assets/images/Ski.png';
import food from '../../assets/images/food.jpg';
import buss from '../../assets/images/buss.jpg';
import hotel from '../../assets/images/hotel.jpg';


function TravelCategory() {
    return (
        <>
            <section className="container">
                <div className="text">
                    <h2>DIFFERENT TYPES</h2>
                </div>
                <div className="rowitems">
                    <div className="container-box">
                        <div className="container-image">
                            <img src={ski} alt="Skidresor" />
                        </div>
                        <h4>Ski destinations</h4>
                        <p>Verbier, Aspen, Niseko</p>
                    </div>

                    <div className="container-box">
                        <div className="container-image">
                            <img src={food} alt="matresor" />
                        </div>
                        <h4>Culinary destinations</h4>
                        <p>Mediterranean, Asian, etc</p>
                    </div>

                    <div className="container-box">
                        <div className="container-image">
                            <img src={buss} alt="Backpacking" />
                        </div>
                        <h4>Backpacking destinations</h4>
                        <p>Bus, Train, etc.</p>
                    </div>

                    <div className="container-box">
                        <div className="container-image">
                            <img src={hotel} alt="Paradisresor" />
                        </div>
                        <h4>Paradise destinations</h4>
                        <p>Dreamyyyyy</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TravelCategory;