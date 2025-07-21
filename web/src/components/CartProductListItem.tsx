import { Button } from './Button';
import { CartProduct, useCartStore } from '@/store/cartStore';

export const CartProductListItem = ({product}: {product: CartProduct}) => {
  const { addProduct, removeProduct } = useCartStore();
  
  const reduceCount = (productId: string) => {removeProduct(productId)}
  const increaseCount = (productId: string) => {addProduct(productId)}
  return (
    <div>
      <div className="cart-product-image-container">
        <img src={product.imgUrl || '/product-picture.png'} alt="Product image" />
      </div>
      <div className="cart-product-text-container">
        <h3 className="cart-product-name">{product.name}</h3>
        <p className="product-description">
          {product.description}
        </p>
      </div>
      <div className="cart-product-counter-container">
        <Button variant="secondary" onClick={() => {reduceCount(product.id)}}>
          -
        </Button>
        <input value={product.count} className="cart-product-counter" disabled/>
        <Button variant="secondary" onClick={() => {increaseCount(product.id)}}>
          +
        </Button>
      </div>
      <div className="cart-product-price-container">{
        product.price.toFixed(2)
      }</div>
    </div>
  )
}