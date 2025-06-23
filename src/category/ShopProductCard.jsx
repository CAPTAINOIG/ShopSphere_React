import { Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, decrement, increment } from "../Redux/counterSlice";
import { toast, Toaster } from "sonner";

const ShopProductCard = ({ product }) => {
  const navigate = useNavigate();
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
    <div>
      <Toaster position="top-right" />
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <img
            src={product.images.side}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNewArrival && (
              <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                -
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                %
              </span>
            )}
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                onClick={() => handleAddToCart(product)}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            )}
          </div>
        </div>

        <div className="p-6 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-1">
            {product.category.toUpperCase()}
          </p>
          <h3 className="font-semibold text-gray-900 mb-3">{product.name}</h3>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.promoPrice}
            </span>
            {product.price && (
              <span className="text-lg text-gray-500 line-through">
                ${product.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
