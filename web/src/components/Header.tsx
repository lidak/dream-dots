import { CartIcon } from "./CartIcon";

export const Header = () => {
  return (
    <header className="bg-background-secondary col-span-12 row-span-1 text-typography-primary flex items-center px-14 py-0">
      <div className="bg-background-fourthiary w-13 h-13 flex-none rounded-full"></div>
      <h3 className="flex-1 px-3 text-xl">Creative sprout</h3>
      <CartIcon className=""/>
    </header>
  );
}