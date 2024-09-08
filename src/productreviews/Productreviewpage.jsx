import React, { useState } from 'react';
import Productdetails from './Productdetails';
import Faqs from './Faqs';
import Ratingreview from './Ratingreview';
// import Cloth from '../category/Cloth';
import Newsletter from '../component/Newsletter';
import Footer from '../component/Footer';
// import Newarrivals from '../category/Newarrivals';

const Productreviewpage = ({userProduct, setUserProduct}) => {
  // console.log('User Product:', userProduct);
  
  const [productView, setProductView] = useState('productdetails');

  const handleProductView = (view) => {
    setProductView(view);
  };

  return (
    <>
      <div className='flex justify-around text-center border-b-2 border-gray-300 mt-10'>
        <div 
          className={`cursor-pointer p-2 ${productView === 'productdetails' ? 'border-b-4 border-gray-500' : 'border-b-4 border-transparent'}`} 
          onClick={() => handleProductView('productdetails')}>
          Product Details
        </div>
        
        <div 
          className={`cursor-pointer p-2 ${productView === 'reviews' ? 'border-b-4 border-gray-500' : 'border-b-4 border-transparent'}`} 
          onClick={() => handleProductView('reviews')}>
          Ratings & Reviews
        </div>
        
        <div 
          className={`cursor-pointer p-2 ${productView === 'faqs' ? 'border-b-4 border-gray-500' : 'border-b-4 border-transparent'}`} 
          onClick={() => handleProductView('faqs')}>
          FAQs
        </div>
      </div>

      {productView === 'productdetails' && <Productdetails userProduct={userProduct} setUserProduct={setUserProduct}/>}
      {productView === 'reviews' && <Ratingreview />}
      {productView === 'faqs' && <Faqs />}
    </>
  );
};

export default Productreviewpage;
