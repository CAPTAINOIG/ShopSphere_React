import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="animate-pulse p-6 flex flex-col lg:flex-row gap-10">
      {/* Left side (product images) */}
      <div className="flex flex-col gap-4 w-full lg:w-1/3">
        <div className="w-full h-80 bg-gray-200 rounded-lg"></div>
        <div className="flex gap-2">
          <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
          <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
          <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
        </div>
      </div>

      {/* Right side (product info) */}
      <div className="flex-1 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        <div className="h-12 bg-gray-300 rounded-md w-40"></div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
