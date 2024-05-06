import "./Trip.css"

import TripData from "./TripData";
import image1 from '../../assets/images/image12.jpg';
import image2 from '../../assets/images/t3.jpg';
import image3 from '../../assets/images/t4.jpg';

function Trip(){
    return(
        <div className="trip">
            <h1>Trip</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, nisi at.</p>
        
        <div className="trip-card">
            <TripData
            image={image1}
            heading = "Trip to Instanbul"
            text="Istanbul, where East meets West, is a mesmerizing tapestry of history, culture, and beauty. Explore the majestic Hagia Sophia, the grandeur of the Blue Mosque, and the bustling markets of the Grand Bazaar. Wander through the narrow streets of the old city, savoring the aromas of traditional Turkish cuisine. Cruise along the Bosphorus, where Europe and Asia converge, and witness stunning views of palaces and minarets. "
            />

            <TripData
            image={image2}
            heading = "Trip to France"
            text="Paris, the City of Lights, captivates with its timeless charm and cultural richness. From iconic landmarks like the Eiffel Tower and Notre-Dame to the artistic allure of Montmartre and the Louvre, every corner tells a story. Indulge in exquisite cuisine, stroll along the Seine, and immerse yourself in the vibrant street life. With its blend of history, art, and romance, Paris is a must-visit destination for any traveler."
            />

            <TripData
            image={image3}
            heading = "Trip to Bali"
            text="Bali, the Island of the Gods, enchants with its breathtaking landscapes and spiritual allure. Discover lush rice terraces, cascading waterfalls, and pristine beaches that beckon to travelers seeking serenity and adventure. Immerse yourself in Balinese culture through vibrant ceremonies, traditional dances, and intricate temple architecture. Indulge in delectable cuisine, from local warungs to upscale dining overlooking the ocean."
            />
        </div>
        </div>

    )
} 

export default Trip;