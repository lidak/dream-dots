import { useQuery } from "@tanstack/react-query";
import { baseUrl, commonHeaders } from "./const";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currentlyInStock: number;
  backorderAvailable: boolean;
  imgUrl?: string;
}

export const useGetProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      return (await fetch(`${baseUrl}/products`, {
        headers: commonHeaders
      })).json();
    }
  });
}