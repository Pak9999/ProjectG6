

import '../../App.css'
import image12 from '../../assets/images/image12.jpg';
import image13 from '../../assets/images/image13.jpg';
import image14 from '../../assets/images/image14.jpg';
import image16 from '../../assets/images/image16.jpg';
import image17 from '../../assets/images/image17.jpg';


function FeaturedDestinations() {



    return (
        <>
           
            <section className="destination-container" id="destination">
                <div className="priceclass-title">
                    <h2>Featured destinations</h2>
                </div>
                <div className="destination-content">

                    <a href="./locations.html#istanbul" target="_blank">
                        <div className="col-content">
                            <img src={image12} alt="Instanbul" />
                            <h5>Turkey</h5>
                            <p>Istanbul</p>
                        </div>
                    </a>

                    <a href="./locations.html#paris" target="_blank">
                        <div className="col-content">
                            <img src={image13} alt="Paris" />
                            <h5>France</h5>
                            <p>Paris</p>
                        </div>
                    </a>

                    <a href="./locations.html#bali" target="_blank">
                        <div class="col-content">
                            <img src={image14} alt="Indonesia" />
                            <h5>Indonesia</h5>
                            <p>Bali</p>
                        </div>
                    </a>

                    <a href="./locations.html#port-blair" target="_blank">
                        <div className="col-content">
                            <img src={image16} alt="Port Blair" />
                            <h5>Andaman & Nicobar</h5>
                            <p>Port Blair</p>
                        </div>
                    </a>


                    <a href="./locations.html#rome" target="_blank">
                        <div className="col-content">
                            <img src={image17} alt="Rome" />
                            <h5>Italy</h5>
                            <p>Rome</p>
                        </div>
                    </a>







                </div>
            </section>
         
        </>
    );
}

export default FeaturedDestinations;