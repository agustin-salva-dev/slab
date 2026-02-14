import type { Metadata } from "next";
import Image from "next/image";
import { inter, neuePower } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
        <Image
          src="/slab-hero-bg.webp"
          alt="Abstract black and white background"
          fill
          priority
          className="hidden md:block blur-sm opacity-55 -z-10"
        />
        <Image
          src="/slab-mobile-hero-bg.webp"
          alt="Abstract black and white background in mobile dimensions"
          fill
          priority
          className="block md:hidden blur-sm opacity-55 -z-10"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
