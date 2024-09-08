import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const Allproducts = ({allProducts, setAllProducts}) => {
  // const [allProducts, setAllProducts] = useState([]);
  // const [productName, setProductName] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      // console.log(response.data.name);
      
      setAllProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (product) => {
    const productName = product.name.toLowerCase().replace(/\s+/g, '-');
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate(`/product/${productName}`);
  };


  return (


  //   <>
  //   <h3 className='text-center text-4xl font-bold'>Smartphones</h3>
  // <div className='p-6 bg-gray-100'>
  //   {smartPhonesCat?.length === 0 ? (
  //     <p className='text-center text-lg font-semibold'>No product found</p>
  //   ) : (
  //     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
  //       {smartPhonesCat.map((item, index) => (
  //         <ProductCard key={index} product={item} />
  //       ))}
  //     </div>
  //   )}
  // </div>
  //   </>
    <>
      <h3 className='text-center text-4xl font-bold my-6'>Explore Our Collection</h3>
      <div className="">
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 lg:grid-cols-6 xl:grid-cols-5 gap-4 p-4">
          {allProducts.length === 0 ? (
            <p>No allProducts found</p>
          ) : (
            allProducts.map((product, i) => (
              <div onClick={() => handleClick(product)} key={i} className="bg-white border cursor-pointer border-gray-200 rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow duration-300">
                {product?.images && product?.images?.front ? (
                  <img 
                    src={product?.images?.front} 
                    alt={product?.name} 
                    className="w-full h-40 object-cover hover:transform hover:scale-110 transition duration-300 ease-in-out"
                  />
                ) : (
                  <p className="text-red-500">Image not available</p>
                )}
                <p className="text-center font-semibold mt-2">{product?.name}</p>
                <p className="text-center text-sm">${product?.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Allproducts;
