import React from 'react';

const savedProductdetails = ({ savedProduct }) => {
    
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{savedProduct?.name}</h1>
      
      <p className="text-gray-700 mt-4">{savedProduct?.description}</p>
      
      <div className="flex gap-4 mt-6">
        <img src={savedProduct?.images?.front} alt="Front View" className="w-1/3 rounded-lg object-cover" />
        <img src={savedProduct?.images?.side} alt="Side View" className="w-1/3 rounded-lg object-cover" />
        <img src={savedProduct?.images?.back} alt="Back View" className="w-1/3 rounded-lg object-cover" />
      </div>
      
      <div className="mt-6">
        <p className="text-2xl text-red-500 font-bold">${savedProduct?.promoPrice}</p>
        <p className="text-sm text-gray-400 line-through">${savedProduct?.price}</p>
        <p className="text-green-500">Save {savedProduct?.discountPercentage}%</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Specifications:</h3>
        <ul className="list-disc ml-6">
          <li>Color: {savedProduct?.color}</li>
          <li>Dimensions: {savedProduct?.dimensions}</li>
          <li>Weight: {savedProduct?.weight}</li>
          <li>Material: {savedProduct?.material}</li>
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-lg font-semibold">Availability: {savedProduct?.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        <div className="flex items-center mt-2">
          <p className="text-sm mr-4">Quantity:</p>
          <input type="number" min="1" max={savedProduct?.stock} defaultValue="1" className="border rounded-lg p-2 w-16" />
        </div>
      </div>

      <div className="mt-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4">Add to Cart</button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg">Buy Now</button>
      </div>
    </div>
  );
};

export default savedProductdetails;
