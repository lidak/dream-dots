import { PageLayout } from "@/components/PageLayout";
import { Product, useGetProducts } from "./useGetProducts";

interface ProductListPageProps {
  clasName?: string;
}

export default function ProductListPage (props: ProductListPageProps) {
  const products = useGetProducts();
  return (
    <PageLayout className={`${props.clasName}`}>
        <>
        {!products.length && <div>No products are currently available!</div>}
        {products.length && (
          <div className="grid grid-cols-2 gap-4 p-4">
          {products.map((product: Product) => (
            <div key={product.id} className="shadow-sm p-4">
              <div>{product.name}</div>
              <div>{product.price}</div>
              <button className={!(product.currentlyInStock || product.backorderAvailable) ? 'disabled': ''}>Add to cart</button>
            </div>
          ))}
          </div>
        )}
        </>
    </PageLayout>
  )
}