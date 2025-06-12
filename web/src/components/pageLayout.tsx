import { Header } from "./Header"

interface PageLayoutProps {
  children: React.ReactElement
}

export const PageLayout = (props: PageLayoutProps) => {
  return <div className="grid grid-cols-12 gap-0 bg-background-primary grid-rows-12">
    <Header/>
    <div className="bg-background-therdiary col-start-2 row-span-11 col-span-10">
        {props.children}
    </div>
  </div>
}