import React, { useState } from 'react';
import './Carousel.css';

function Carousel({ children }) {
    const [current, setCurrent] = useState(0);

    const nextItem = () => setCurrent(current === children.length - 1 ? 0 : current + 1);
    const prevItem = () => setCurrent(current === 0 ? children.length - 1 : current - 1);

    return (
        <div className="carousel-container">
            <button onClick={prevItem}>Prev</button>
            <div className="carousel-items">
                {React.Children.map(children, (child, index) => (
                    React.cloneElement(child, {
                        className: `carousel-item ${index === current ? 'active' : ''}`,
                        key: index
                    })
                ))}
            </div>
            <button onClick={nextItem}>Next</button>
        </div>
    );
}

export default Carousel;




/*

import React, { useState } from 'react';
import './Carousel.css';




import image12 from '../../assets/images/image12.jpg';
import image13 from '../../assets/images/image13.jpg';
import image14 from '../../assets/images/image14.jpg';
import image16 from '../../assets/images/image16.jpg';
import image17 from '../../assets/images/image17.jpg';

const Carousel = () => {
    const items = [
        { image: image12, text: 'Istanbul' },
        { image: image13, text: 'Paris' },
        { image: image14, text: 'Bali' },
        { image: image16, text: 'India YAOZA' },
        { image: image17, text: 'Rome' },
        // Add more items as needed
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const goToLeft = () => {
        setActiveIndex((activeIndex - 1 + items.length) % items.length);
    };

    const goToRight = () => {
        setActiveIndex((activeIndex + 1) % items.length);
    };

    return (
        <div className="carousel-container">
            <button className="carousel-button carousel-button-left" onClick={goToLeft}>‹</button>
            <div className="carousel-items">
                {items.map((item, index) => (
                    <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
                        <img src={item.image} alt={item.text} />
                        <div className="carousel-item-text">{item.text}</div>
                    </div>
                ))}
            </div>
            <button className="carousel-button carousel-button-right" onClick={goToRight}>›</button>
        </div>
    );
};

export default Carousel;
*/