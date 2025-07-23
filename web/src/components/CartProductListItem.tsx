import { Button } from './Button';
import { CartProduct, useCartStore } from '@/store/cartStore';

export const CartProductListItem = ({product}: {product: CartProduct}) => {
  const { addProduct, removeProduct } = useCartStore();
  
  const reduceCount = (productId: string) => {removeProduct(productId)}
  const increaseCount = (productId: string) => {addProduct(productId)}
  return (
    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto_auto] gap-x-6 gap-y-4 p-6 shadow-sm bg-white items-center mb-4">
      <div className="cart-product-image-container justify-self-center md:justify-self-start">
        <img src={product.imgUrl || '/product-picture.png'} alt="Product image" className="w-24 h-24 object-cover rounded-md" />
      </div>
      <div className="cart-product-text-container text-center md:text-left">
        <h3 className="cart-product-name font-bold">{product.name}</h3>
        <p className="product-description text-sm text-gray-600">
          {product.description}
        </p>
      </div>
      <div className="cart-product-counter-container flex justify-self-center">
        <Button variant="thertiary" onClick={() => {reduceCount(product.id)}}>
          -
        </Button>
        <input value={product.count} className="cart-product-counter w-8 text-center border-[var(--color-background-button-therdiary)] border-1 mx-2" disabled id={`cart-item-${product.id}`}/>
        <Button variant="thertiary" onClick={() => {increaseCount(product.id)}}>
          +
        </Button>
      </div>
      <div className="cart-product-price-container font-bold justify-self-center md:justify-self-end">${
        product.price.toFixed(2)
      }</div>
    </div>
  )
}