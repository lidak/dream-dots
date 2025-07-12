'use client';

import { PageLayout } from "@/components/PageLayout";
import Image from "next/image";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import { useGetProducts } from "@/api/useGetProducts";
import { useGetProductsNumber } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CartPage() {

  const { data: products, isLoading: isProductsLoading } = useGetProducts();
  const productsNumber = useGetProductsNumber();
  const router = useRouter();

  return (
    <PageLayout className={`flex align-middle justify-${productsNumber ? 'start' : 'center'}`}>
      {!productsNumber && (
        <>
          <div className="align-middle justify-center flex-col m-auto text-center">
            <div className="text-xl text-typography-tertiary pb-10">Your cart is empty</div>
            <Image src="/empty-cart.svg" alt="sad empty cart" height={250} width={250} className="justify-self-center" />
            <div className="pt-10">
              <Link href="/plp">
                Go to gallery
              </Link>
              <span> to get yourself something fun!</span>
            </div>
          </div>
        </>
      )}
      {
        isProductsLoading && (
          <div>Loading...</div>
        )
      }
      {
        !!productsNumber && !isProductsLoading && (products?.map((product) => (
          <div key={product.id}>{product.name}</div>
        )))
      }
      <div>
        <Button variant="secondary" onClick={() => {router.push('/plp')}}>
          Back to gallery
        </Button>
        <Button variant="primary" onClick={() => {router.push('/checkout')}} disabled>
          Checkout
        </Button>
      </div>

    </PageLayout>
  );
}