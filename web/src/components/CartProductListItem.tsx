import { Product } from '@/api/useGetProducts';

export const CartProductListItem = ({product}: {product: Product}) => {
  return (<div>{product.name}</div>)
}