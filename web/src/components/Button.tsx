"use client";

import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  variant: 'primary'|'secondary'|'thertiary';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const Button = (props: ButtonProps) => {
  const secondaryBackgroundClass = props.disabled ? 'bg-gray-400' : 'bg-black'
  const backgroundMap = {
    primary: 'bg-background-primary',
    secondary: secondaryBackgroundClass,
    thertiary: 'bg-background-button-therdiary',
  }
  const backgroundColorClassName = backgroundMap[props.variant];

  const textColorClassName = props.variant !== 'secondary' ? 'text-gray-500' : 'text-white ';
  const cursorClass = props.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
  const shapeClassNames = props.variant === 'thertiary' ? 'rounded-full height-8 w-6' : 'rounded-sm p-2';
  const className = `${shapeClassNames} ${backgroundColorClassName} ${textColorClassName} ${cursorClass} ` + 
    `${props.className}`;
  
  return <button disabled={props.disabled} className={className} onClick={props.onClick}>{props.children}</button>;
}