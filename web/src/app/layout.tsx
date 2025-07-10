import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Little Artist's Art",
  description: "The website is waiting for my content. And so are you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
