import React, { useState } from 'react';
import Homepage from '../component/Homepage';
import Sponsor from '../component/Sponsor';
import Smartphones from '../category/Smartphones';
import Wears from '../category/Wears';
import Allproducts from '../category/Allproducts';
import Customer from '../customer/Customer';
import Newsletter from '../component/Newsletter';
import Footer from '../component/Footer';

const ProductDetails = ({ allProducts, setAllProducts }) => {
  return (
    <div>
      <Homepage />
      <Sponsor />
      <Smartphones />
      <Wears />
      <Allproducts allProducts={allProducts} setAllProducts={setAllProducts} />
      <Customer />
      <Newsletter />
      <Footer/>
    </div>
  );
};

export default ProductDetails;
