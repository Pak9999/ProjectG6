
import './App.css'
import africa from './assets/images/africa.jpg';
import asia from './assets/images/asia.jpg';
import europe from './assets/images/europe.jpg';
import america from './assets/images/north-america.jpeg';
import southamerica from './assets/images/south-america.jpg';
import oceania from './assets/images/oceania.jpg';
import antarctis from './assets/images/antarctis1.jpg';

function Continents() {


    
    return (
        <>
            
            <section className="destination" id="destination">
                <div className="priceclass-title">
                    <h2>Continents</h2>
                </div>

                <div className="continent-content">
                    <a href="./locations.html#africa" target="_blank">
                        <div className="col-content">
                            <img src={africa} alt="Africa" />
                            <h5>Africa</h5>
                        </div>
                    </a>


                    <a href="./locations.html#asia" target="_blank">
                        <div className="col-content">
                            <img src={asia} alt="Asia" />
                            <h5>Asia</h5>
                        </div>
                    </a>


                    <a href="./locations.html#europe" target="_blank">
                        <div className="col-content">
                            <img src={europe} alt="Europe" />
                            <h5>Europe</h5>
                        </div>
                    </a>


                    <a href="./locations.html#port-blair" target="_blank">
                        <div className="col-content">
                            <img src={america} alt="North America" />
                            <h5>North America</h5>
                        </div>
                    </a>


                    <a href="./locations.html#rome" target="_blank">
                        <div className="col-content">
                            <img src={southamerica} alt="South America" />
                            <h5>South America</h5>
                        </div>
                    </a>


                    <a href="./locations.html#rome" target="_blank">
                        <div className="col-content">
                            <img src={oceania} alt="Oceania" />
                            <h5>Oceania</h5>
                        </div>
                    </a>


                    <a href="./locations.html#Antarctis" target="_blank">
                        <div className="col-content">
                            <img src={antarctis} alt="Antartica" />
                            <h5>Antartica</h5>

                        </div>
                    </a>







                </div>
            </section>
        </>
    );
}

export default Continents;