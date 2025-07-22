import { Button } from './Button';
import { CartProduct, useCartStore } from '@/store/cartStore';

export const CartProductListItem = ({product}: {product: CartProduct}) => {
  const { addProduct, removeProduct } = useCartStore();
  
  const reduceCount = (productId: string) => {removeProduct(productId)}
  const increaseCount = (productId: string) => {addProduct(productId)}
  return (
    <div className="flex flex-row p-6 shadow-sm bg-white items-center justify-between">
      <div className="cart-product-image-container">
        <img src={product.imgUrl || '/product-picture.png'} alt="Product image" />
      </div>
      <div className="cart-product-text-container m-3">
        <h3 className="cart-product-name font-bold">{product.name}</h3>
        <p className="product-description">
          {product.description}
        </p>
      </div>
      <div className="cart-product-counter-container flex">
        <Button variant="tertiary" onClick={() => {reduceCount(product.id)}}>
          -
        </Button>
        <input value={product.count} className="cart-product-counter w-8" disabled id={`cart-item-${product.id}`}/>
        <Button variant="tertiary" onClick={() => {increaseCount(product.id)}}>
          +
        </Button>
      </div>
      <div className="cart-product-price-container font-bold">${
        product.price.toFixed(2)
      }</div>
    </div>
  )
}