import React from 'react';

const Wishlist = ({ wishlist }) => {
  const shareWishlist = () => {
    const text = wishlist
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.region}) - Capital: ${item.capital}, Population: ${item.population}`
      )
      .join('\n');

    navigator.clipboard.writeText(text);
    alert('📋 Wishlist copied to clipboard!');
  };

  return (
    <div className="wishlist">
      <h2>📝 Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No destinations added yet!</p>
      ) : (
        <>
          <ul>
            {wishlist.map((item, index) => (
              <li key={index}>
                <img src={item.flag} alt="flag" className="flag" />
                <span className="name">{item.name}</span> — {item.region}
              </li>
            ))}
          </ul>
          <button className="share-btn" onClick={shareWishlist}>
            Share Wishlist 📤
          </button>
        </>
      )}
    </div>
  );
};

export default Wishlist;
