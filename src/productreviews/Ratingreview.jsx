import React from 'react';
import { ratings } from '../component/data';
import Starrated from '../component/Starrated';

const Ratingreview = () => {
  return (
    <div className='grid lg:grid-cols-4 bg-gray-300 gap-6 p-5'>
      {ratings.map((item, i) => (
        <div key={i} className='border border-gray-300 bg-white rounded-lg p-5 shadow-lg'>
          <Starrated rating={item.rating} />
          <p className="text-xl font-bold mt-4 mb-2">⭕{item.name}</p>
          <p className="text-gray-700 mb-4">{item.testimony}</p>
          <p className="text-sm text-gray-500">{item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Ratingreview;
