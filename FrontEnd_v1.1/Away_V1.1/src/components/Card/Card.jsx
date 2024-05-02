import paris from '../../assets/images/image13.jpg';
import Button from '../../components/Button/Button';

import './Card.css'

function Card (){
    return(
        <div className="card-container">
            <img src={paris} alt="" />
            <h2 className='card-title'>Paris</h2>
            <p className='card-description'>Frankriker paris aalalal
            </p>
            <Button className="card-btn">Läs mer</Button>
                
           
        </div>
    )
}

export default Card