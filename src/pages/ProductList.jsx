import React, { useEffect, useState } from 'react';
import { ratings } from '../component/data';
import Starrated from '../component/Starrated';
import Productreviewpage from '../productreviews/Productreviewpage';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const userDetails = localStorage.getItem('user');

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState('');
  const [userProduct, setUserProduct] = useState({});

  useEffect(() => {
    const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    console.log(savedProduct);

    if (savedProduct) {
      setUserProduct(savedProduct);
      setSelectedImage(savedProduct.images?.front || '');
    }
  }, [setUserProduct, userProduct]);

  const handleCart =() =>{
    if(!userDetails){
      return navigate('/login')
    }
  }

  if (!userProduct.name) return <div>Loading...</div>;

  return (
    <div className='container mx-auto p-8'>
      <div className='grid lg:grid-cols-2 gap-8'>
        <div className='flex gap-8'>
          <div>
            <img src={userProduct?.images?.side} alt='Side View' className={`w-full hover:border-blue-500  rounded-lg my-2 bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${selectedImage === userProduct?.images?.side ? 'border-pink-500' : 'border-gray-900'}`} onClick={() => setSelectedImage(userProduct?.images?.side)} />

            <img src={userProduct?.images?.back} alt='Back View' className={`w-full hover:border-blue-500  rounded-lg bg-gray-200 p-4  h-32 object-cover cursor-pointer border ${selectedImage === userProduct?.images?.back ? 'border-pink-600' : 'border-gray-900'}`} onClick={() => setSelectedImage(userProduct?.images?.back)} />

            <img src={userProduct?.images?.additional} alt='Additional View' className={`hover:border-blue-500 w-full my-2 rounded-lg bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${selectedImage === userProduct?.images?.additional ? 'border-pink-500' : 'border-gray-900'}`} onClick={() => setSelectedImage(userProduct?.images?.additional)} />
          </div>
          <div className='lg:w-[500px] lg:h-[400px] w-[300px] md:w-[550px]  bg-gray-200 border border-gray-200 p-4 my-2 rounded-lg overflow-hidden'>
            <img src={selectedImage} alt={userProduct?.name} className='w-full h-full object-cover' />
          </div>
        </div>

        <div className='flex flex-col justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-4'>{userProduct?.name}</h1>
            <div className='flex gap-2 items-center'>
              <span>
                <Starrated ratings={userProduct.rating} />
              </span>
              <span>5.0</span>
            </div>
            <div className='flex gap-2 my-2'>
              <p className='text-2xl font-semibold'>${userProduct?.price}</p>
              <p className='text-2xl font-semibold line-through text-gray-400'>${userProduct?.promoPrice}</p>
              <p className='text-sm text-pink-500 bg-pink-200 rounded-full px-2 py-1'>-{userProduct?.discountPercentage}%</p>
            </div>
            <hr />
            {/* ⭐⭐⭐⭐⭐ */}
            <p className='text-lg text-gray-600 mb-4'>{userProduct?.description}</p>
            <hr />
            <p className='text-sm text-pink-500 my-4'>Available Quantity: {userProduct?.availableQuantity}</p>
          </div>
          <div>
            <button onClick={()=> handleCart()} className='bg-pink-500 w-full text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-400 transition'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Productreviewpage userProduct={userProduct} setUserProduct={setUserProduct}/>
    </div>
  );
};

export default ProductDetails;
