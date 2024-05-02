import { Link } from 'react-router-dom';

import Trip from './Trip'
import "./Trip.css"

function TripData(props) {
    return(
        <div className="t-card">
        <div className="t-image">
            <img src={props.image} alt="image" />
        </div>
        <h4>{props.heading}</h4>
        <p>{props.text}</p>
        <Link to="/article-template">
            <button className="read-more">Read More</button>
        </Link>
        </div>
    )
}

export default TripData;