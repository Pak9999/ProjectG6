import React, { useState } from 'react';
import './Slider.css';

import t8 from '../../assets/images/t8.jpg';
import image13 from '../../assets/images/image13.jpg';
import image14 from '../../assets/images/image14.jpg';
import image15 from '../../assets/images/image15.jpg';
import image16 from '../../assets/images/image16.jpg';
import image17 from '../../assets/images/image17.jpg';

function Slider() {
    const images = [t8, image13, image14, image15, image16, image17];
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent(current === images.length - 1 ? 0 : current + 1);
    const prevSlide = () => setCurrent(current === 0 ? images.length - 1 : current - 1);

    return (
        <div className="slider">
            <div className="slider-images">
                {images.map((image, index) => (
                    <img
                        src={image}
                        alt=""
                        className={`slider-image ${index === current ? 'active' : ''}`}
                        key={index}
                    />
                ))}
            </div>
            
            <div className="slider-dots">
                {images.map((_, index) => (
                    <span
                        className={`slider-dot ${index === current ? 'active' : ''}`}
                        key={index}
                    />
                ))}
            </div>

            <div className="slider-buttons">
                <button onClick={prevSlide}>Prev</button>
                <button onClick={nextSlide}>Next</button>
            </div>
            
        </div>
    );
}

export default Slider;