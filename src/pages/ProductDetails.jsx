import React, { useState } from 'react';
import Homepage from '../component/Homepage';
import Sponsor from '../component/Sponsor';
import Smartphones from '../category/Smartphones';
import Wears from '../category/Wears';
import Allproducts from '../category/Allproducts';
import Customer from '../customer/Customer';
import Newsletter from '../component/Newsletter';
import Footer from '../component/Footer';
import WelcomePopup from '../hooks/WelcomePopup';
import { useGetProducts } from '../hooks/product';

const ProductDetails = () => {
  // const { data: allProducts, isLoading, isError } = useGetProducts();

  return (
    <div>
      <Homepage />
      <Sponsor />
      <Smartphones />
      <WelcomePopup />
      <Wears />
      <Allproducts />
      <Customer />
      <Newsletter />
      <Footer/>
    </div>
  );
};

export default ProductDetails;
