import { PageLayout } from "@/components/PageLayout";
import Image from "next/image";

export default function Home() {
  return (
    <PageLayout>
      <div className="grid grid-rows-[1fr_20px] items-start justify-items-top min-h-screen p-8 pb-2 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] items-center">
          <h1 className="p-10" style={{fontSize: 30}}>Thanks for stopping by!!!</h1>
          <Image
            src="/logo.png"
            alt="nata logo"
            width={180}
            height={38}
            priority
          />

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <h2>The website is under construction. No kidding! The logo is almost ready and one small story will be published soon! So stay tuned.</h2>
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
