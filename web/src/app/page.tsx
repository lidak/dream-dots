import { Link } from "@/components/Link";
import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import Image from "next/image";

export default function Home() {
  return (
    <PageLayout>
      <div className="grid grid-rows-[1fr_20px] items-start justify-items-top min-h-screen p-8 pb-2 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[10px]">
          <Title size={1}>Wellcome to Creative Sprout.</Title>
          <Title size={2}>Here imagination takes shape through handmade stickers and artwork.</Title>
          <div className="flex flex-row">
            <Image
              src="/new-herro-message.svg"
              alt="nata logo"
              width="400"
              height="400"
              className="mr-5"
            />
            <div>
              <div className="pb-7">
                <Link href="/cart">Explore unique creations</Link><span> made with love and creativity.</span>
              </div>
              <div>
                <span> Have a question? </span><Link href="/">Contact us</Link><span> and we'll respond soon</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
