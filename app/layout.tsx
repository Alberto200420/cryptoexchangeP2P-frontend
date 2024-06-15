import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Setup from "@/components/server/Setup";
// import { Providers } from "@/components/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Exchange P2P",
  description: "buy and sell bitcoin p2p at a price and without high commissions, receive money through bank transfers for your sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <Providers> */}
          {/* <Navbar/> */}
          <Setup/> {/* toastify */}
          <div className={inter.className}>{children}</div>
          {/* <Footer/> */}
        {/* </Providers> */}
      </body>
    </html>
  );
}
