import { ReactNode } from "react"

interface TitleProps {
  size: 1|2,
  children: ReactNode,
}

export const Title = (props: TitleProps) => {
return (
  <div className="text-3xl text-typography-tertiary font-sans">{props.children}</div>
)}