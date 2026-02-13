import type { Metadata } from "next";
import { inter, neuePower } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Slab - Short Urls",
  description: "orgotten links into powerful assets. Create clean URLs that are safe to click, easy to remember, and impossible to ignore. We provide the tools to build your presence with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={`${inter.variable} ${neuePower.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
