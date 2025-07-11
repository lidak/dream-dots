"use client";
import { Product } from "@/api/useGetProducts";
import { Button } from "./Button";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product
}

export function ProductCard(props: ProductCardProps) {
  const {
    product
  } = props;
  const { addProduct } = useCartStore();
  const buttonHandler = (id: string ) => {
    addProduct(id);
  }

  return <div key={product.id} className="shadow-sm p-6 bg-white">
    <div>
      <img src={product.imgUrl || '/product-picture.png'} alt="Product image" />
    </div>
    <div className="font-bold py-3">{product.name}</div>
    <div>{product.description}</div>
    <div className="font-bold py-3">${product.price}</div>
    <Button variant="primary" disabled={!product.currentlyInStock} onClick={() => buttonHandler(product.id)} className={!(product.currentlyInStock || product.backorderAvailable) ? 'disabled' : ''}>
      add to cart
    </Button>
  </div>;
}
