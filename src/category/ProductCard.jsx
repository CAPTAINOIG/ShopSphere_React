import { useNavigate } from 'react-router-dom';
import { usePostProductClick } from '../hooks/product';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

   const { mutateAsync: postProductClick } = usePostProductClick();
 
   const handleProductClick = async (product) => {
     try {
       const response = await postProductClick({ productId: product.id });
       navigate(`/product/${product.id}`);
       window.scrollTo({ top: 0, behavior: "smooth" });
     } catch (error) {
       toast.error(error.message);
     }
   };

  return (
    <div
      onClick={() => handleProductClick(product)}
      className='bg-white border cursor-pointer border-gray-200 rounded-lg shadow-md overflow-hidden'
    >
      <div className='p-4'>
        <img
          src={product?.images?.front}
          alt={product?.name}
          className='w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105 hover:translate-y-1'
        />
        <h3 className='text-xl font-semibold mb-2'>{product?.name}</h3>
        <p className='text-gray-600 mb-2 truncate'>{product?.description}</p>
        <p className='text-lg font-bold mb-2'>${product?.price}</p>
        <p className='text-sm text-gray-500'>Available Quantity: {product?.availableQuantity}</p>
      </div>
    </div>
  );
};

export default ProductCard;
