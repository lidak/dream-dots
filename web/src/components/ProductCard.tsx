"use client";
import { Product } from "@/app/plp/useGetProducts";
import { Button } from "./Button";

interface ProductCardProps {
  product: Product
}

export function ProductCard(props: ProductCardProps) {
  const {
    product
  } = props;
  const buttonHandler = () => { }

  return <div key={product.id} className="shadow-sm p-6 bg-white">
    <div>
      <img src={product.imgUrl || '/product-picture.png'} alt="Product image" />
    </div>
    <div className="font-bold py-3">{product.name}</div>
    <div>{product.description}</div>
    <div className="font-bold py-3">${product.price}</div>
    <Button variant="primary" disabled={!product.currentlyInStock} onClick={buttonHandler} className={!(product.currentlyInStock || product.backorderAvailable) ? 'disabled' : ''}>
      add to cart
    </Button>
  </div>;
}


