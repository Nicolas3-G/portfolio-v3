import type { Metadata } from "next";
import "./globals.css";
import { HeaderNav } from "./HeaderNav";

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
      <body>
        <header className="sticky top-0 z-50 border-b border-zinc-200/75 bg-[#F6F3EA]/75 backdrop-blur-sm">
          <HeaderNav />
        </header>
        {children}
      </body>
    </html>
  );
}
