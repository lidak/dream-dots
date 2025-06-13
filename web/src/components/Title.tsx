import { ReactNode } from "react"

interface TitleProps {
  size: 1|2,
  children: ReactNode,
}

export const Title = (props: TitleProps) => {
  const additionalClasses = props.size === 1 ? 
  "text-typography-tertiary text-3xl": "text-typography-primary text-xl"
return (
  <div className={`${additionalClasses} font-sans`}>{props.children}</div>
)}