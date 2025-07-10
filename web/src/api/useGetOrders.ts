import { useQuery } from "@tanstack/react-query";
import { Product } from "./useGetProducts";
import { baseUrl, commonHeaders } from "./const";

export interface Order {
  id: string;
  name: string;
  userId: string,
  createdAt: string;
  status: string;
  total: number;
  products: Product[];
}

export const useGetProducts = (clientId: string) => {
  return useQuery<Order[]>({
    queryKey: ['orders', clientId],
    queryFn: async () => {
      return (await fetch(`${baseUrl}/orders/${clientId}`, {
        headers: commonHeaders
      })).json();
    }
  });
}