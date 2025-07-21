'use client';

import { useGetProductsNumber } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CartIconProps {
  className: string;
}

export const CartIcon = (props: CartIconProps) => {
  const [isClient, setIsClient] = useState(false);
  const number = useGetProductsNumber();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link href="cart">
      <Image src="/cart.svg" alt="Cart Icon" width={30} height={30} className={props.className}/>
      {isClient && number > 0 && (
        <span className="transform translate-x-1/2 -translate-y-1/2 bg-purple-300 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {number}
        </span>
      )}
    </Link>
  )
}