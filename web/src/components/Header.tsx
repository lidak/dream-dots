import { CartIcon } from "./CartIcon";
import NextLink from "next/link";


export const Header = () => {
  return (
    <header className="bg-background-secondary col-span-12 row-span-1 text-typography-primary flex items-center px-14 py-0">
      <NextLink href="/">
        <div className="w-13 h-13 flex-none rounded-full bg-[url(/hamster-logo.jpg)] bg-size-[100px] bg-center-top bg-position-[center_top_-16px]"></div>
      </NextLink>
      <h3 className="flex-1 px-3 text-xl">Dream Dots</h3>
      <CartIcon className=""/>
    </header>
  );
}