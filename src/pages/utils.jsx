// import React, { useEffect, useState } from 'react';
// import Starrated from '../component/Starrated';
// import Productreviewpage from '../productreviews/Productreviewpage';
// import { useNavigate } from 'react-router-dom';

// const ProductList = () => {
//   const userDetails = localStorage.getItem('user');
//   const navigate = useNavigate();
  
//   const [selectedImage, setSelectedImage] = useState(''); // Initialize as an empty string
//   const [userProduct, setUserProduct] = useState({});
//   const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
//   console.log(('savedProduct'), savedProduct);
  
//   useEffect(() => {
//     if (savedProduct) {
//       setUserProduct(savedProduct);
//       // setSelectedImage(userProduct?.images?.front);
//     }
//   }, []); // Use an empty dependency array to run this only once on component mount

//   const handleCart = () => {
//     if (!userDetails) {
//       return navigate('/login');
//     }
//   };

//   const handleImage = (newImage) => {
//     setSelectedImage(newImage); // Update selected image on click
//   };

//   if (!userProduct.name) return <div>Loading...</div>;

//   return (
//     <div className='container mx-auto p-8'>
//       <div className='grid lg:grid-cols-2 gap-8'>
//         <div className='flex gap-8'>
//           <div>
//             <img
//               src={savedProduct?.images?.side}
//               alt='Side View'
//               className={`w-full hover:border-blue-500 rounded-lg my-2 bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${
//                 selectedImage === savedProduct?.images?.side ? 'border-pink-500' : 'border-gray-900'
//               }`}
//               onClick={() => handleImage(savedProduct?.images?.side)}
//             />
//             <img
//               src={savedProduct?.images?.back}
//               alt='Back View'
//               className={`w-full hover:border-blue-500 rounded-lg bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${
//                 selectedImage === savedProduct?.images?.back ? 'border-pink-600' : 'border-gray-900'
//               }`}
//               onClick={() => handleImage(savedProduct?.images?.back)}
//             />
//             <img
//               src={savedProduct?.images?.additional}
//               alt='Additional View'
//               className={`hover:border-blue-500 w-full my-2 rounded-lg bg-gray-200 p-4 h-32 object-cover cursor-pointer border ${
//                 selectedImage === savedProduct?.images?.additional ? 'border-pink-500' : 'border-gray-900'
//               }`}
//               onClick={() => handleImage(savedProduct?.images?.additional)}
//             />
//           </div>


//           {
//             selectedImage ?
//             <img className="className='lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[250px] w-[100%] h-auto bg-gray-200 border border-gray-200 p-4 my-2 rounded-lg overflow-hidden'" src={selectedImage} alt="Main" />
//             :
//             <img
//             className="className='lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[250px] w-[100%] h-auto bg-gray-200 border border-gray-200 p-4 my-2 rounded-lg overflow-hidden'"
//             src={savedProduct.images.front}
//             alt="Thumbnail"
//           />
//         }
//           {/* <div className='lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[250px] w-[100%] h-auto bg-gray-200 border border-gray-200 p-4 my-2 rounded-lg overflow-hidden'>
//             <img className="w-full h-full object-cover" src={selectedImage} alt="Main" />
//           </div> */}
//         </div>

//         <div className='flex flex-col justify-between'>
//           <div>
//             <h1 className='text-3xl font-bold mb-4'>{savedProduct?.name}</h1>
//             <div className='flex gap-2 items-center'>
//               <span>
//                 <Starrated ratings={savedProduct.rating} />
//               </span>
//               <span>5.0</span>
//             </div>
//             <div className='flex gap-2 my-2'>
//               <p className='text-2xl font-semibold'>${savedProduct?.price}</p>
//               <p className='text-2xl font-semibold line-through text-gray-400'>${savedProduct?.promoPrice}</p>
//               <p className='text-sm text-pink-500 bg-pink-200 rounded-full px-2 py-1'>-{savedProduct?.discountPercentage}%</p>
//             </div>
//             <hr />
//             <p className='text-lg text-gray-600 mb-4'>{savedProduct?.description}</p>
//             <hr />
//             <p className='text-sm text-pink-500 my-4'>Available Quantity: {savedProduct?.availableQuantity}</p>
//           </div>
//           <div>
//             <button onClick={handleCart} className='bg-pink-500 w-full text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-400 transition'>
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//       <Productreviewpage userProduct={userProduct} setUserProduct={setUserProduct} />
//       {/* <Productreviewpage/> */}
//     </div>
//   );
// };

// export default ProductList;
