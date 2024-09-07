import React from 'react';
import { ratings } from '../component/data';
import './Customer.css';
import Starrated from '../component/Starrated';

const Customer = () => {
  return (
    <>
       <h3 className='text-center text-4xl font-bold my-6'>OUR HAPPY CUSTOMERS</h3>
    <div className="overflow-x-hidden overflow-y w-full">
      <div className="flex space-x-4 animate-scroll mb-10">
        {ratings.map((item, i) => (
          <div
          key={i}
          className="flex-shrink-0"
          >
            <p className="text-xl font-bold">⭕{item.name}</p>
            {/* <p className="text-green-500">{item.rating}</p> */}
            <Starrated rating={item.rating}/>
            <p className="italic mt-2 text-sm break-words text-wrap">{item.testimony}</p>
          </div>
        ))}
      </div>
    </div>
        </>
  );
};

export default Customer;
