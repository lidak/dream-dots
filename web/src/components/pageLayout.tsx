interface PageLayoutProps {
  children: React.ReactElement
}

export const PageLayout = (props: PageLayoutProps) => {
  return <div className="grid grid-cols-12 gap-0 bg-background-primary grid-rows-12">
    <header className="bg-background-secondary col-span-12 row-span-1 text-typography-primary flex items-center px-14 py-0">
      <div className="bg-background-fourthiary w-13 h-13 flex-none rounded-full"></div>
      <h3 className="flex-1 px-3 text-xl">Creative sprout</h3>
    </header>
    <div className="bg-background-therdiary col-start-2 row-span-11 col-span-10">
        {props.children}
    </div>
  </div>
}