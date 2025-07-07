import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const DestinationCard = ({ destination, onAdd }) => {
  return (
    <div className="card">
      {/* Image Carousel */}
      {destination.images?.length > 1 ? (
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          className="carousel"
        >
          {destination.images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`${destination.name}-${index}`} />
            </div>
          ))}
        </Carousel>
      ) : (
        <img src={destination.images?.[0] || destination.flag} alt={destination.name} className="card-image" />
      )}

      {/* Country Info */}
      <h2>{destination.name}</h2>
      <p>🌎 <strong>Region:</strong> {destination.region}</p>
      <p>🏛️ <strong>Capital:</strong> {destination.capital}</p>
      <p>👥 <strong>Population:</strong> {destination.population.toLocaleString()}</p>
      <p>🕒 <strong>Timezones:</strong> {destination.timezones?.join(', ')}</p>

      {/* Add to Wishlist Button */}
      <button onClick={onAdd}>Add to Wishlist ❤️</button>
    </div>
  );
};

export default DestinationCard;
