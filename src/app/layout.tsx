import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-inter",
});

const neuePower = localFont({
  src: "./fonts/NeuePower-Ultra.woff2",
  variable: "--font-neue-power",
});

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
    <html lang="en">
      <body
        className={`${inter.variable} ${neuePower.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
