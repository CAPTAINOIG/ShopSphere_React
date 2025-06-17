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
