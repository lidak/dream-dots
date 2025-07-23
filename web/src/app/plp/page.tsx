'use client';

import { PageLayout } from "@/components/PageLayout";
import { Product, useGetProducts } from "../../api/useGetProducts";
import { ProductCard } from "@/components/ProductCard";
import { Spinner } from "@/components/Spinner";

export default function ProductListPage () {
  const { data: products, isLoading } = useGetProducts();
  return (
    <PageLayout>
      {
        !products?.length && (
          <div className="flex items-center justify-center min-h-[calc(100vh-137px)] self-center w-full">
            {
              isLoading ? <Spinner/> : <h2 className="text-xl text-typography-tertiary"> No products are currently available! </h2>
            }
          </div>
        )
      }
      {products?.length && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        </div>
      )}
    </PageLayout>
  )
} 
