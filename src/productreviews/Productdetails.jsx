import React from 'react';

const userProductdetails = ({ userProduct }) => {
  // console.log('userProduct:', userProduct);
    
  const handleClick = (product) => {
    const productName = product.name.toLowerCase().replace(/\s+/g, '-');
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate(`/product/${productName}`);
  };
  return (
   
    <div className="p-4">
      <h1 className="text-3xl font-bold">{userProduct?.name}</h1>
      
      {/* userProduct Description */}
      <p className="text-gray-700 mt-4">{userProduct?.description}</p>
      
      {/* userProduct Images */}
      <div className="flex gap-4 mt-6">
        <img src={userProduct?.images?.front} alt="Front View" className="w-1/3 rounded-lg object-cover" />
        <img src={userProduct?.images?.side} alt="Side View" className="w-1/3 rounded-lg object-cover" />
        <img src={userProduct?.images?.back} alt="Back View" className="w-1/3 rounded-lg object-cover" />
      </div>
      
      {/* Pricing Information */}
      <div className="mt-6">
        <p className="text-2xl text-red-500 font-bold">${userProduct?.promoPrice}</p>
        <p className="text-sm text-gray-400 line-through">${userProduct?.price}</p>
        <p className="text-green-500">Save {userProduct?.discountPercentage}%</p>
      </div>

      {/* Specifications */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Specifications:</h3>
        <ul className="list-disc ml-6">
          <li>Color: {userProduct?.color}</li>
          <li>Dimensions: {userProduct?.dimensions}</li>
          <li>Weight: {userProduct?.weight}</li>
          <li>Material: {userProduct?.material}</li>
        </ul>
      </div>

      {/* Availability and Quantity Selector */}
      <div className="mt-4">
        <p className="text-lg font-semibold">Availability: {userProduct?.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        <div className="flex items-center mt-2">
          <p className="text-sm mr-4">Quantity:</p>
          <input type="number" min="1" max={userProduct?.stock} defaultValue="1" className="border rounded-lg p-2 w-16" />
        </div>
      </div>

      {/* Add to Cart / Buy Now */}
      <div className="mt-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4">Add to Cart</button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg">Buy Now</button>
      </div>
    </div>
  );
};

export default userProductdetails;
