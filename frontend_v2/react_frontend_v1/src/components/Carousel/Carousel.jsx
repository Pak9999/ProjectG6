import React, { useState, useEffect } from 'react';
import './Carousel.css';

import img1 from '../../assets/images/sliderimg1.jpg';
import img2 from '../../assets/images/sliderimg2.jpg';
import img3 from '../../assets/images/sliderimg3.jpg';
import img4 from '../../assets/images/sliderimg4.jpg';
import img5 from '../../assets/images/sliderimg5.jpg';
import img6 from '../../assets/images/sliderimg6.jpg';
import img7 from '../../assets/images/sliderimg7.jpg';
import img8 from '../../assets/images/sliderimg8.jpg';
import img9 from '../../assets/images/sliderimg9.jpg';

const Carousel = () => {
    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [visibleImages, setVisibleImages] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setVisibleImages(1);
            } else if (window.innerWidth < 900) {
                setVisibleImages(2);
            } else {
                setVisibleImages(4);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [currentImageIndex]);

    const nextSlide = () => {
        const newIndex = currentImageIndex >= images.length - visibleImages ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = currentImageIndex <= 0 ? images.length - visibleImages : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
    };

    return (
        <div className="carousel" key={currentImageIndex}>
            <button onClick={prevSlide}>&larr;</button>
            <div className="carousel-images">
                {images.slice(currentImageIndex, currentImageIndex + visibleImages).map((image, index) => (
                    <img key={index} src={image} alt="" />
                ))}
            </div>
            <button onClick={nextSlide}>&rarr;</button>
        </div>
    );
};

export default Carousel;