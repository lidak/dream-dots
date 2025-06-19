"use client";

import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  variant: 'primary'|'secondary';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const Button = (props: ButtonProps) => {
  const backgroundColorClassName = props.variant === 'primary' ? 'bg-black': 'bg-background-primary';
  const textColorClassName = props.variant === 'primary' ? 'text-white ': 'text-gray-500';
  const className = `rounded-sm py-2 w-[100%] ${backgroundColorClassName} ${textColorClassName} cursor-pointer ` + 
    `${props.className} ${props.disabled && 'backdrop-opacity-20'}`;
  
  return <button disabled={props.disabled} className={className} onClick={props.onClick}>{props.children}</button>;
}