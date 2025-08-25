import { AlertTriangle, Clock, Eye, Heart, ShoppingCart, Star, TrendingUp } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, increment } from "../Redux/counterSlice";
import { toast } from "sonner";

const OnsaleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.counterReducer.cart);
  const productInCart = store?.find((item) => item?.id === product?.id);

  const handleAddToCart = () => {
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
    }
    dispatch(addToCart(newCart));
    toast.success("Product added to cart");
  }

  const handleIncrement = () => {
    dispatch(increment(product.id));
  }

  const handleDecrement = () => {
    dispatch(decrement(product.id));
  }

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product?.images?.front || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isHot && (
            <div className="flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" />
              HOT DEAL
            </div>
          )}
          {product.originalPrice && (
            <div className="flex items-center bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {productInCart ? (
            <div className="flex gap-4 justify-between text-center items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement(product.id);
                }}
                className="bg-gray-400 px-4 py-2 rounded-lg text-white"
              >
                -
              </button>
              <span className="px-4 py-2 text-lg">
                {productInCart?.cartQuantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrement(product.id);
                }}
                className="bg-pink-500 px-4 py-2 rounded-lg text-white"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="w-full bg-black/90 backdrop-blur-sm text-white py-2 rounded-lg font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Quick Add
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating || "4.5"}</span>
          <span className="text-sm text-gray-500">
            ({product.reviewCount || "24"})
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{product.brand || "Brand"}</p>

        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {product.timeLeft && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-red-500">
              <Clock className="w-3 h-3" />
              <span>Sale ends in {product.timeLeft}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnsaleProduct;
