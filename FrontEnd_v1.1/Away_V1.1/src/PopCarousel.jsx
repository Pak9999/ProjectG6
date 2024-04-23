import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image13 from './assets/images/image13.jpg';

function PopCarousel() {
    return (
        <div className="carousel-container">
        <Carousel autoPlay interval={10000} showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows dynamicHeight>
            <div className="carousel-card">
                <img src={image13} alt="Paris" className="carousel-image" />
                <div className="carousel-caption">
                    <h2>PARIS</h2>
                    <p>FRANCE Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores non debitis, possimus quo nihil architecto, iure quod illum neque mollitia magni nam, temporibus ducimus at recusandae quisquam eius doloribus quos.</p>
                </div>
            </div>
            <div className="carousel-card">
                <img src={image13} alt="Paris" className="carousel-image" />
                <div className="carousel-caption">
                    <h2>PARIS</h2>
                    <p>FRANCE Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores non debitis, possimus quo nihil architecto, iure quod illum neque mollitia magni nam, temporibus ducimus at recusandae quisquam eius doloribus quos.</p>
                </div>
            </div>
            <div className="carousel-card">
                <img src={image13} alt="Paris" className="carousel-image" />
                <div className="carousel-caption">
                    <h2>PARIS</h2>
                    <p>FRANCE Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores non debitis, possimus quo nihil architecto, iure quod illum neque mollitia magni nam, temporibus ducimus at recusandae quisquam eius doloribus quos.</p>
                </div>
            </div>
            {/* Add more cards as needed */}
        </Carousel>
    </div>
    );
}

export default PopCarousel;