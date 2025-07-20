'use client';

import { PageLayout } from "@/components/PageLayout";
import Image from "next/image";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import { useGetProducts } from "@/api/useGetProducts";
import { useGetProductsNumber, useGetCartProducts } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { CartProductListItem } from "@/components/CartProductListItem";
import { Spinner } from "@/components/Spinner";
import { useMemo } from "react";

export default function CartPage() {

  const { isLoading: isProductsLoading } = useGetProducts();
  const productsNumber = useGetProductsNumber();
  const router = useRouter();
  const products = useGetCartProducts();
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.price * product.count;
    }, 0  );
  }, [products]);

  return (
    <PageLayout className="flex flex-col justify-start items-center">
      {
        isProductsLoading && (
        <div className="flex items-center justify-center min-h-[calc(100vh-137px)] self-center w-full">   
          <Spinner />
        </div>
        )
      }
      {
        !isProductsLoading && !productsNumber && (
        <div className="flex items-center justify-center min-h-[calc(100vh-137px)] self-center w-full">   
          <div className="align-middle justify-center flex-col text-center">
            <div className="text-xl text-typography-tertiary pb-10">
              Your cart is empty
            </div>
            <Image
              src="/empty-cart.svg"
              alt="sad empty cart"
              height={250}
              width={250}
              className="justify-self-center"
            />
            <div className="pt-10">
              <Link href="/plp">Go to gallery</Link>
              <span> to get yourself something fun!</span>
            </div>
          </div>
        </div>)
      }

      {!!productsNumber && !isProductsLoading && (
        <div className="w-full">
          {products?.map((product) => (
            <CartProductListItem key={product.id} product={product} />
          ))}
          <div className="flex items-end gap-4 m-4 self-end cart-total-container">
            Total 
            ${Math.round(total * 100) / 100}
          </div>
        </div>
      )}
      {!isProductsLoading && (
        <div className="flex items-end gap-4 m-4 self-end">
          <Button
            variant="secondary"
            onClick={() => {
              router.push('/plp');
            }}
          >
            Back to gallery
          </Button>
          <Button variant="primary" onClick={() => {router.push('/checkout')}} disabled>
            Checkout
          </Button>
        </div>
      )}
    </PageLayout>
  );
}