import axiosInstance from "../axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products");
      return response.data;
    },
  });
};

export const useGetClothProducts = () => {
  return useQuery({
    queryKey: ["cloth-products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category/Shirts");
      return response.data;
    },
  });
};

export const useGetSmartPhoneProducts = () => {
  return useQuery({
    queryKey: ["smartphone-products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category/Smartphones");
      return response.data;
    },
  });
};

export const useGetCategoryWearsProducts = () => {
  return useQuery({
    queryKey: ["category-wears-products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category/Clothing");
      return response.data;
    },
  });
} 