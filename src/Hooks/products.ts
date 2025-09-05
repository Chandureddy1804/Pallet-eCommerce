import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "../Services/api";

export function useProducts(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: () => fetchProducts({ page: page + 1, pageSize }),
    placeholderData: (prev) => prev,
    staleTime: 10_000,
  });
}

export function useProduct(id: string | number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 10_000,
  });
}
