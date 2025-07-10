'use client';

import { PageLayout } from "@/components/PageLayout";
import { Product, useGetProducts } from "../../api/useGetProducts";
import { ProductCard } from "@/components/ProductCard";

export default function ProductListPage () {
  const { data: products } = useGetProducts();
  return (
    <PageLayout>
        <>
        {!products?.length && <div>No products are currently available!</div>}
        {products?.length && (
          <div className="grid grid-cols-2 gap-4 p-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          </div>
        )}
        </>
    </PageLayout>
  )
} 
