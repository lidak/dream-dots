import { PageLayout } from "@/components/PageLayout";
import { Product, useGetProducts } from "./useGetProducts";



export default function ProductListPage () {
  const products = useGetProducts();
  return (
    <PageLayout>
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