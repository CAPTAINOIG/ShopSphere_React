import React, { useEffect, useState } from 'react';
import Starrated from '../component/Starrated';
import Productreviewpage from '../productreviews/Productreviewpage';
import { useNavigate } from 'react-router-dom';
import Cloth from '../category/Cloth';
import Newsletter from '../component/Newsletter';
import Footer from '../component/Footer';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increment } from '../Redux/counterSlice';

    const Arrivalist = () => {
    const store = useSelector((state) => state.counterReducer.cart);
    // console.log(store);
  
    const userDetails = JSON?.parse(localStorage?.getItem('user'));
    // console.log(userDetails);
    const token = JSON?.parse(localStorage?.getItem('shoppinToken'));
    // console.log(token);
    // const userId = JSON.parse(localStorage.getItem('userId'));
  
  
    const navigate = useNavigate();
  
    const [selectedImage, setSelectedImage] = useState(''); // Initialize as an empty string
    const [userProduct, setUserProduct] = useState({});
    const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    // console.log(('savedProduct'), savedProduct);
    // console.log(savedProduct.id);
  
  
    const dispatch = useDispatch()
    useEffect(() => {
      if (savedProduct) {
        setUserProduct(savedProduct);
        // setSelectedImage(userProduct?.images?.front);
      }
    }, []);
  
    useEffect(() => {
      if (!token) {
        navigate('/login')
      }
    }, [])
  
  
    const handleCart = async () => {
      if (!userDetails) {
        console.log('User is not logged in.');
        toast.error('You must be signed in to add items to your cart.');
        return navigate('/login');
      }
      // const productId = userId;
      // console.log(productId);
  
      const productItem = store?.find((item) => item?.id === savedProduct.id);
      if (productItem) {
        // console.log(productItem);
        toast?.success('product added successfully');
        if (productItem?.cartQuantity < productItem?.availableQuantity) {
          // console.log('Incrementing product quantity');
          dispatch(increment(productItem?.id));
        } else {
          // console.log('Cannot add more than available stock');
          toast.error('Cannot add more than available stock');
        };
      }
      else {
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
        }
        // console.log(newCart);
        toast?.success('product added successfully');
        dispatch(addToCart(newCart));
      }
    }

  const handleImage = (newImage) => {
    setSelectedImage(newImage); // Update selected image on click
  };

  if (!userProduct.name) return <div>Loading...</div>;

  return (
    <div className='container mx-auto p-8'>
      <div className='grid lg:grid-cols-2 gap-8'>
        <div className='lg:flex flex-auto md:flex gap-8'>
          <div>
            <img
              src={savedProduct?.images?.side}
              alt='Side View'
              className={`w-full hover:border-blue-500 rounded-lg my-2 bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${
                selectedImage === savedProduct?.images?.side ? 'border-pink-500' : 'border-gray-900'
              }`}
              onClick={() => handleImage(savedProduct?.images?.side)}
            />
            <img
              src={savedProduct?.images?.back}
              alt='Back View'
              className={`w-full hover:border-blue-500 rounded-lg bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${
                selectedImage === savedProduct?.images?.back ? 'border-pink-600' : 'border-gray-900'
              }`}
              onClick={() => handleImage(savedProduct?.images?.back)}
            />
            <img
              src={savedProduct?.images?.additional}
              alt='Additional View'
              className={`hover:border-blue-500 w-full my-2 rounded-lg bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${
                selectedImage === savedProduct?.images?.additional ? 'border-pink-500' : 'border-gray-900'
              }`}
              onClick={() => handleImage(savedProduct?.images?.additional)}
            />
          </div>


          {
            selectedImage ?
            <img className="className='lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[250px] w-[100%] h-auto bg-gray-200 border border-gray-200 p-4 my-2 rounded-lg overflow-hidden'" src={selectedImage} alt="Main" />
            :
            <img
            className="className='lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[250px] w-[100%] h-auto bg-gray-200 border border-gray-200 p-4 my-2 rounded-lg overflow-hidden'"
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
              <p className='text-2xl font-semibold'>${savedProduct?.price}</p>
              <p className='text-2xl font-semibold line-through text-gray-400'>${savedProduct?.promoPrice}</p>
              <p className='text-sm text-pink-500 bg-pink-200 rounded-full px-2 py-1'>-{savedProduct?.discountPercentage}%</p>
            </div>
            <hr />
            <p className='text-lg text-gray-600 mb-4'>{savedProduct?.description}</p>
            <hr />
            <p className='text-sm text-pink-500 my-4'>Available Quantity: {savedProduct?.availableQuantity}</p>
          </div>
          <div>
            <button onClick={handleCart} className='bg-pink-500 w-full text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-400 transition'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Productreviewpage userProduct={userProduct} setUserProduct={setUserProduct} />
      {/* <Productreviewpage/> */}
      <Cloth/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Arrivalist;
