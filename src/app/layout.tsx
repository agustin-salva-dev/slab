import type { Metadata } from "next";
import Image from "next/image";
import { inter, neuePower } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Slab — Modern URL Shortener | All your links in one place.",
  description:
    "Slab turns long, forgotten links into powerful assets. Create clean URLs that are safe to click, easy to remember, and impossible to ignore. We provide the tools to build your presence with confidence.",
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
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.variable} ${neuePower.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <Image
              src="/slab-hero-bg.webp"
              alt="Abstract black and white background"
              fill
              sizes="100vw"
              priority
              className="hidden md:block blur-sm opacity-55 object-cover"
            />
            <Image
              src="/slab-mobile-hero-bg.webp"
              alt="Abstract black and white background in mobile dimensions"
              fill
              sizes="100vw"
              priority
              className="block md:hidden blur-sm opacity-55 object-cover"
            />
          </div>
          <Navbar />
          <main className="main-content px-6 md:px-32">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
