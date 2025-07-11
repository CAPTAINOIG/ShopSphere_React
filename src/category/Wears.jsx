import React, { useEffect } from "react";
import { useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import ProductSkeleton from "../hooks/ProductSkeleton";
import { toast, Toaster } from "sonner";
import { useGetCategoryWearsProducts } from "../hooks/product";

const Wears = () => {
  const {data: categoryWears, isLoading, isError} = useGetCategoryWearsProducts();

  return (
    <>
      <Toaster position="top-right" />
      <h3 className="text-center text-4xl font-bold my-3">Fashion</h3>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <div className="p-6 bg-gray-100">
          {categoryWears?.products?.length === 0 ? (
            <p className="text-center text-lg font-semibold">
              No product found
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryWears.products.length > 0 && categoryWears.products.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Wears;
