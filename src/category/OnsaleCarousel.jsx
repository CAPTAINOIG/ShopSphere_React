import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, increment } from "../Redux/counterSlice";
import { toast, Toaster } from "sonner";
import { Clock, ShoppingCart, Star, TrendingUp } from "lucide-react";

const OnsaleCarousel = ({ product, handleProductClick }) => {
  const store = useSelector((state) => state.counterReducer.cart);
  const productInCart = store?.find((item) => item?.id === product?.id);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    let newCart = {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      promoPrice: product?.promoPrice,
      cartQuantity: 1,
      discountPercentage: product?.discountPercentage,
      description: product?.description,
      category: product?.category,
      availableQuantity: product?.availableQuantity,
      image1: product?.images?.side,
      image2: product?.images?.back,
      image3: product?.images?.front,
      image4: product?.images?.additional,
    };
    dispatch(addToCart(newCart));
    toast.success("Product added successfully");
  };

  const handleIncrement = (id) => {
    dispatch(increment(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
  };

  return (
    <div className="w-full flex-shrink-0">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-red-600" />
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                Featured Deal
              </span>
            </div>
            <h3 className="text-4xl font-bold mb-4">{product?.name}</h3>
            <p className="text-lg text-gray-600 mb-6">{product?.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-900" />
                <span className="font-semibold">{product?.rating}</span>
                <span className="text-gray-500">
                  ({product?.reviews} reviews)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold">${product?.price}</span>
              {product?.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product?.originalPrice}
                </span>
              )}
              <span className="text-xl font-bold text-red-600 ml-2">
                Save {product?.discount}%
              </span>
            </div>
            <div className="flex gap-4">
              {productInCart ? (
                  <div className="flex gap-4 justify-between text-center items-center">
                    <button
                      onClick={() => handleDecrement(product.id)}
                      className="bg-gray-400 px-4 py-2 rounded-lg text-white"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-lg">
                      {productInCart?.cartQuantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className="bg-pink-500 px-4 py-2 rounded-lg text-white"
                    >
                      +
                    </button>
                  </div>
                ) : (
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              )}
              <button
                onClick={() => handleProductClick(product)}
                className="border-2 border-black text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src={product?.images?.front}
              alt={product?.name}
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            {product?.isHot && (
              <div className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-2 rounded-full font-bold">
                🔥 LIMITED STOCK
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-center">
              <Clock className="inline w-4 h-4 mr-2" />
              Deal ends in {product?.timeLeft}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnsaleCarousel;
