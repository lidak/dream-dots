import { PageLayout } from "@/components/PageLayout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex align-middle justify-center">
        <div className="text-xl text-typography-secondary">Your cart is empty</div>
        <Link href="/">Go to gallery</Link>
      </div>
    </PageLayout>
  );
}