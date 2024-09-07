import React from 'react';

const Starrated = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="text-pink-600 text-lg">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="text-gray-400 text-lg">&#9733;</span>); 
    }
  }

  return <div className="flex">{stars}</div>;

  
};

export default Starrated;