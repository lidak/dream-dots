import { PageLayout } from "@/components/PageLayout";
import Image from "next/image";
import { Link } from "@/components/Link";

export default function Home() {
  return (
    <PageLayout className="flex align-middle justify-center">
      <div className="align-middle justify-center flex-col m-auto text-center">
        <div className="text-xl text-typography-tertiary pb-10">Your cart is empty</div>
        <Image src="/empty-cart.svg" alt="sad empty cart" height={250} width={250} className="justify-self-center"/>
        <div className="pt-10">
          <Link href="/">
            Go to gallery
          </Link>
          <span> to get yourself something fun!</span>
        </div>
      </div>
    </PageLayout>
  );
}