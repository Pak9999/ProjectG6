import React from 'react';
import './Card.css';
import Carousel from '../../components/Carousel/Carousel';

import Button from '../../components/Button/Button';

import image12 from '../../assets/images/image12.jpg';
import image13 from '../../assets/images/image13.jpg';

function Card() {
    const items = [
        { image: image12, title: 'Istanbul', description: 'Istanbul asdaklpd  saopd aspoopasdop  opsaopsa wowepoa aodsapod dopasdksa dadopasdoad oapdka odoakd po' },
        { image: image13, title: 'Paris', description: 'Istanbul asdaklpd  saopd aspoopasdop  opsaopsa wowepoa aodsapod dopasdksa dadopasdoad oapdka odoakd po' },
        // Add more items as needed
    ];

    return (
        <Carousel>
            {items.map((item, index) => (
                <div className="card" key={index}>
                    <img src={item.image} alt={item.title} />
                    <div className="card-content">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <Button className="card-button">Find out more</Button>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}

export default Card;