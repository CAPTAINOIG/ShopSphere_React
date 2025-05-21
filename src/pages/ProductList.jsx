import React, { useEffect, useState } from 'react';
import Starrated from '../component/Starrated';
import Productreviewpage from '../productreviews/Productreviewpage';
import Newarrivals from '../category/Newarrivals';
import Footer from '../component/Footer';
import Newsletter from '../component/Newsletter';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increment, decrement } from '../Redux/counterSlice'; // Import decrement action
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import gif from '../assets/image/gif.gif';
import Cloth from '../category/Cloth';

const ProductList = () => {
  const {productId} = useParams();
  const store = useSelector((state) => state.counterReducer.cart);
  const dispatch = useDispatch();
  
  const [selectedImage, setSelectedImage] = useState(''); 
  const [savedProduct, setSavedProduct] = useState({})
  const productInCart = store?.find((item) => item?.id === savedProduct?.id);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/product/${productId}`);
        setSavedProduct(response.data)  
        setSelectedImage(response.data.images.front);      
      } catch (error) {
        // console.error("Failed to fetch product data:", error);
      }
    };
  
    fetchProduct();
  }, [productId]);


  const handleAddToCart = async () => {
      let newCart = {
        id: savedProduct?.id,
        name: savedProduct?.name,
        price: savedProduct?.price,
        promoPrice: savedProduct?.promoPrice,
        cartQuantity: 1,
        discountPercentage: savedProduct?.discountPercentage,
        description: savedProduct?.description,
        category: savedProduct?.category,
        availableQuantity: savedProduct?.availableQuantity,
        image1: savedProduct?.images?.front,
        image2: savedProduct?.images?.back,
        image3: savedProduct?.images?.side,
        image4: savedProduct?.images?.additional,
      };
      dispatch(addToCart(newCart));
      toast.success('Product added successfully');
    };


    const handleIncrement = (itemId) => {
      dispatch(increment(itemId));
    };
  
    const handleDecrement = (itemId) => {
      dispatch(decrement(itemId));
    };
 
  const handleImage = (newImage) => {
    setSelectedImage(newImage); 
  };

  if (!savedProduct.name) return <div> <img
  src={gif}
  alt="Loading..."
  className="lg:ms-[-100px] border p-3 shadow-xl rounded-xl w-[100px] mt-10"
/></div>;

  return (
    <div className='container mx-auto p-8'>
      <div className='grid lg:grid-cols-2 gap-8'>
        <div className='lg:flex flex-auto md:flex gap-8'>
          <div>
            <img
              src={savedProduct?.images?.side}
              alt='Side View'
              className={`w-full hover:border-blue-500 rounded-lg my-2 bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${selectedImage === savedProduct?.images?.side ? 'border-pink-500' : 'border-gray-900'
                }`}
              onClick={() => handleImage(savedProduct?.images?.side)}
            />
            <img
              src={savedProduct?.images?.back}
              alt='Back View'
              className={`w-full hover:border-blue-500 rounded-lg bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${selectedImage === savedProduct?.images?.back ? 'border-pink-600' : 'border-gray-900'
                }`}
              onClick={() => handleImage(savedProduct?.images?.back)}
            />
            <img
              src={savedProduct?.images?.additional}
              alt='Additional View'
              className={`hover:border-blue-500 w-full my-2 rounded-lg bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${selectedImage === savedProduct?.images?.additional ? 'border-pink-500' : 'border-gray-900'
                }`}
              onClick={() => handleImage(savedProduct?.images?.additional)}
            />
          </div>

          {
            selectedImage ? 
              <img className="lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[250px] w-[100%] h-auto bg-gray-200 border border-gray-200 p-4 my-2 rounded-lg overflow-hidden" src={selectedImage} alt="Main" />
              : 
              <img
                className="lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[250px] w-[100%] h-auto bg-gray-200 border border-gray-200 p-4 my-2 rounded-lg overflow-hidden"
                src={savedProduct.images.front}
                alt="Thumbnail"
              />
          }
        </div>

        <div className='flex flex-col justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-4'>{savedProduct?.name}</h1>
            <div className='flex gap-2 items-center'>
              <span>
                <Starrated ratings={savedProduct.rating} />
              </span>
              <span>5.0</span>
            </div>
            <div className='flex gap-2 my-2'>
              <p className='text-2xl font-semibold'>${savedProduct?.promoPrice}</p>
              <p className='text-2xl font-semibold line-through text-gray-400'>${savedProduct?.price}</p>
              <p className='text-sm text-pink-500 bg-pink-200 rounded-full px-2 py-1'>-{savedProduct?.discountPercentage}%</p>
            </div>
            <hr />
            <p className='text-lg text-gray-600 mb-4'>{savedProduct?.description}</p>
            <hr />
            <p className='text-sm text-pink-500 my-4'>Available Quantity: {savedProduct?.availableQuantity}</p>
          </div>
          <div>
            {productInCart ? (
              <div className='flex gap-4'>
                <button onClick={() => handleDecrement(savedProduct.id)} className='bg-gray-400 px-4 py-2 rounded-lg text-white'>
                  -
                </button>
                <span className='px-4 py-2 text-lg'>{productInCart?.cartQuantity}</span>
                <button onClick={() => handleIncrement(savedProduct.id)} className='bg-pink-500 px-4 py-2 rounded-lg text-white'>
                  +
                </button>
                <span className='px-4 py-2 text-lg'>{`${productInCart?.cartQuantity} items added`}</span>
                
              </div>
            ) : (
              <button onClick={handleAddToCart} className='bg-pink-500 w-full text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-400 transition'>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <Productreviewpage savedProduct={savedProduct} setSavedProduct={setSavedProduct} />
      <Newarrivals />
      <Cloth />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
