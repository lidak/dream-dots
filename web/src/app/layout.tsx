'use client';

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { payPal } from '../../../env.json';

const paypalOptions = {
    clientId: payPal.dev.clientId,
};

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

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
        <PayPalScriptProvider options={paypalOptions}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </PayPalScriptProvider>
      </body>
    </html>
  );
}
