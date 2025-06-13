import NextLink from 'next/link';
import { ReactNode } from 'react';

interface LinkProps {
  children: ReactNode,
  href: string,
}

export const Link = (props: LinkProps) => {
  return (
  <NextLink href={props.href} className="font-bold text-md text-typography-tertiary underline">
    {props.children}
  </NextLink>)
}