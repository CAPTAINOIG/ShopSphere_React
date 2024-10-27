import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const ProductId = () => {
    const { productId } = useParams();
    console.log(productId);

    
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axiosInstance.get(`/product/${productId}`);
          console.log(response);
          
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      };
    
      fetchProduct();
    }, [productId]);
  return (
    <div>ProductId</div>
  )
}

export default ProductId