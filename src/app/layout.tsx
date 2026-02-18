import type { Metadata } from "next";
import Image from "next/image";
import { inter, neuePower } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Slab — All your links in one place.",
  description: "Forgotten links into powerful assets. Create clean URLs that are safe to click, easy to remember, and impossible to ignore. We provide the tools to build your presence with confidence.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={`${inter.variable} ${neuePower.variable}`}
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
        <main className="main-content px-6 md:px-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
