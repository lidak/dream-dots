import Image from 'next/image';
import Link from 'next/link';

interface CartIconProps {
  className: string;
}

export const CartIcon = (props: CartIconProps) => {
  return (
    <Link href="cart">
      <Image src="/cart.svg" alt="Cart Icon" width={30} height={30} className={props.className}/>
    </Link>
  )
}