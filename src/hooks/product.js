import axiosInstance from "../axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useNewsLetter = () => {
  return useMutation({
    mutationFn: async (email) => {
      const response = await axiosInstance.post("/news", {
        email,
      });
      return response.data;
    },
  });
};

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

export const useGetCategoryAccessoriesProducts = () => {
  return useQuery({
    queryKey: ["category-accessories-products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category/Accessories");
      return response.data;
    },
  });
} 

export const useGetOnsaleProducts = () => {
  return useQuery({
    queryKey: ["onsale-products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category/onSale");
      return response.data;
    },
  });
};

export const useGetNewArrivalsProducts = () => {
  return useQuery({
    queryKey: ["new-arrivals-products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category/Tops");
      return response.data;
    },
  });
};

export const usePostProductClick = () => {
  return useMutation({
    mutationFn: async ({productId}) => {
      const response = await axiosInstance.post(`/return-product/${productId}`);
      return response.data;
    },
  });
};