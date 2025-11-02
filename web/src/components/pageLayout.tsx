
import { Header } from "./Header"

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout = (props: PageLayoutProps) => {
  return <div className="grid grid-cols-12 gap-0 Y
   grid-rows-12 min-h-lvh">
    <Header/>
    <div className={`bg-background-therdiary col-start-2 row-span-11 col-span-10 ${props.className}`}>
        {props.children}
    </div>
  </div>
}