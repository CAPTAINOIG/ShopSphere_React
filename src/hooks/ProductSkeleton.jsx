import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex flex-col items-center bg-white p-4 rounded-xl shadow w-full"
        >
          <div className="bg-gray-300 h-48 w-full rounded-md mb-4" />
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
