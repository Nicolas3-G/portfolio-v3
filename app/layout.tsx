import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "./Footer";
import { HeaderNav } from "./HeaderNav";
import { ScrollToHash } from "./ScrollToHash";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <ScrollToHash />
        <header className="header-slide-in sticky top-0 z-50 border-b border-zinc-200/75 bg-[#F6F3EA]/75 backdrop-blur-sm">
          <HeaderNav />
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
