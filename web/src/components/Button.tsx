"use client";

import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  variant: 'primary'|'secondary'|'tertiary';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const Button = (props: ButtonProps) => {
  const secondaryBackgroundClass = props.disabled ? 'bg-gray-400' : 'bg-black'
  const backgroundColorClassName = props.variant === 'primary' ? 'bg-background-primary' : secondaryBackgroundClass;
  // const backgroundMap = {
  //   primary: 'bg-background-primary',
  //   secondary: secondaryBackgroundClass,
  //   tertiary: 'bg-background-therdiary',
  // }
  const textColorClassName = props.variant === 'primary' ? 'text-gray-500' : 'text-white ';
  const cursorClass = props.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
  const className = `rounded-sm p-2 ${backgroundColorClassName} ${textColorClassName} ${cursorClass} ` + 
    `${props.className}`;
  
  return <button disabled={props.disabled} className={className} onClick={props.onClick}>{props.children}</button>;
}